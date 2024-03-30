import express from "express";
import bcrypt from "bcrypt";
import validate from "validate.js";
import passport from "passport";
import cors from 'cors';
import { user as User } from "../models/user.js";
import { setPassword, setUser } from "./queries.js";
import { requireAuth } from "./requireAuth.js";
import { constraints } from "../src/constraints.js";

let routerAuth = express.Router();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

/* 
Zur Einrichtung der Authentifizierung via Passport habe ich mich an einer Tutorialreihe auf YouTube orientiert.
Leider wurde dort kein öffentlich zugängliches Repo hinterlegt, daher verweise ich hier auf die Playlist.
https://www.youtube.com/watch?v=8fT9GxPdBkg&list=PLUUOvUPrFYcjel-IKiAQY4coJJ9EUjfcP&index=1
*/

routerAuth.post("/register", async function (req, res) {
    try {
        const { name, username, password } = req.body;
        let user = new User();
        let feedbackName = user.setName(name);
        let feedbackUsername = await user.setUsername(username);
        let feedbackPassword = await user.setPassword(password);
        if (feedbackName.result || feedbackUsername.result || feedbackPassword.result) {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: (`${feedbackName.message} ${feedbackUsername.message} ${feedbackPassword.message}`)
                }
            })
        }
        await setUser(user.username, user.password, user.name);
        res.status(200).json(user);
    } catch (err) {
        throw new Error(err)
    }
});

routerAuth.post("/login", cors(corsOptions),
    (req, res, next) => {
        passport.authenticate("local",
            (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        message: "Zugriff verweigert",
                        code: 401
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({
                        message: "Zugriff gewährt",
                        code: 200
                    })
                })
            })(req, res, next)
    }
);

routerAuth.get("/logout", requireAuth, async function (req, res) {
    req.session = null;
    res.send();
});

routerAuth.get("/isTeacher", requireAuth, function (req, res) {
    if (req.user.role === "teacher") {
        res.status(200).json({
            msg: `${req.user.name} ist Lehrer`,
            code: 200
        })
    }
    else {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
});

routerAuth.get("/getUser", requireAuth, (req, res) => {
    res.send(req.user);
});

routerAuth.post("/updatePassword", requireAuth, async (req, res) => {
    let validation = await validate.single(req.body.newPassword, constraints.password);
    if (req.body.newPassword === req.body.confirmPassword && validation === undefined) {
        let newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
        await setPassword(req.user.ID, newPasswordHash);
        res.status(200).json({
            msg: "Passwort geändert",
            code: 200
        });
    }
    else {
        res.status(400).json({
            msg: "Eingaben stimmen nicht überein",
            code: 400
        });
    }
});

routerAuth.all("*", async function (req, res) {
    try {
        res.status(404).json({
            msg: "Seite nicht gefunden",
            code: 404
        })
    } catch (err) {
        throw new Error(err)
    }
});

export default routerAuth;