import express from "express";
import { getProgressComplete, getVocabulary, learn, updateProgress } from "../src/main.js";


let routerSQL = express.Router();
const ClientURL = "http://localhost:3000/";
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

routerSQL.get('/learn', requireAuth, async (req, res) => {
    res.send(await learn(req.query.language))
});

routerSQL.post('/updateProgress', requireAuth, async (req, res) => {
    await updateProgress(req.body.text.ID, req.user.id, req.body.language);
    res.end();
});

routerSQL.get('/getProgressComplete', requireAuth, async (req, res) => {
    res.send(await getProgressComplete(req.query.language, req.user.id))
});

routerSQL.get('/getVocabulary', requireAuth, async (req, res) => {
    res.send(await getVocabulary(req.query.language))
});

routerSQL.all("*", async function (req, res) {
    try {
        res.status(404).json({
            msg: "Seite nicht gefunden",
            code: 404
        })
    } catch (err) {
        throw new Error(err)
    }
});


export default routerSQL;