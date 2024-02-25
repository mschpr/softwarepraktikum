import { getPassword, getProgressComplete, getUser, getVocabulary, learn, updateProgress } from "./main.js";
import express from 'express';
import cors from 'cors';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { _ as routerAuth } from "../lib/routerAuth.js";
import routerSQL from "../lib/routerSQL.js";
import cookieSession from "cookie-session";
import bcrypt from "bcrypt";

const app = express();
const port = 3001;

let _ = {};

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

_.start = () => {
    try {
        app.listen(port);
        console.log(`Server listening on port: ${port}`);
    }
    catch (err) {
        throw new Error(err);
    }
}

app.use(cookieSession({
    name: "app-auth",
    keys: ["geheim-neu", "geheim-alt"], // per .env laden
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: false,
    secure: false
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(async (user, done) => {
    let username = JSON.stringify(user[0].username).replace(/"/g, '');
    console.log(`4 - Serialize User: ${username}`);
    return done(null, username);
});

passport.deserializeUser(async (username, done) => {
    console.log(`Deserializing User: ${username}`);
    let user = await getUser(username);
    if (user.length === 1) {
        return done(null, { id: user[0].ID, username: user[0].username });
    } else {
        return done(new Error(`Kein User ${username} gefunden`));
    }
})

passport.use("local", new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
        console.log(`2 - Local strategy verify cb ${JSON.stringify(username)}`);

        let user = await getUser(username);
        if (user.length === 0) {
            return done("Nutzername ungültig", false)
        }
        let passwordHash = await getPassword(username);
        let result = await bcrypt.compare(password, passwordHash);

        if (result) {
            return done(null, user);
        } else {
            return done("Passwort ungültig", false)
        }
    },
));

app.use("/auth", routerAuth);
app.use("/sql", routerSQL);

app.get('/', async (req, res) => {
    res.send("Test: Hello World")
})

_.start();