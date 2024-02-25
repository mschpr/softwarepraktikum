import express from "express";
import { _ as User } from "../models/user.js";
import passport from "passport";
import { getUser } from "../src/main.js";
import cors from 'cors';

export let _ = express.Router();
const ClientURL = "http://localhost:3000/"
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}


// _.post("/register", async function (req, res) {
//     try {
//         const { name, username, email, password } = req.body;
//         let user = new User();
//         let msg = false;
//         msg = user.setName(name);
//         msg = user.setUsername(username);
//         msg = user.setEmail(email);
//         msg = await user.setPassword(password);
//         if (msg) return res.status(400).json({
//             error: {
//                 code: 400,
//                 message: msg
//             }
//         })

//         user.save();
//         res.status(200).json(user);
//     } catch (err) {
//         throw new Error(err)
//     }
// })

_.post("/login", cors(corsOptions),
    (req, res, next) => {
        console.log(`1 - LogIn Handler ${JSON.stringify(req.body)}`);
        passport.authenticate("local",
            (err, user) => {
                console.log(`3 - Password authenticate cb ${JSON.stringify(user)}`);
                if (err || !user) {
                    return res.status(401).json({
                        msg: "Zugriff verweigert",
                        code: 401
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({
                        redirectTo: "/"
                    })
                })
            })(req, res, next)
    }
);


const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.status(403).json({
            msg: "Zugang verweigert",
            code: 403
        })
    }
};

_.get("/user", requireAuth, async (req, res) => {
    try {

        let user = await getUser(req.user.username);
        res.status(200).json({
            user: user[0].username,
            id: user[0].ID
        });

    } catch (err) {
        console.error(new Error(err));
        res.status(500).json({
            msg: "Keinen Zugriff auf User. Internal Server Error",
            code: 500
        })
    }
});

_.post("/logout", async function (req, res) {
    try {
        res.status(200).json({
            msg: "Erfolgreich abgemeldet",
            code: 200
        })
    } catch (err) {
        throw new Error(err)
    }
});

_.all("*", async function (req, res) {
    try {
        res.status(404).json({
            msg: "Seite nicht gefunden",
            code: 404
        })
    } catch (err) {
        throw new Error(err)
    }
});