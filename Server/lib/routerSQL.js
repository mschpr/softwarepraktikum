import express from "express";
import { addUserToClass, createClass, getClassProgress, getClassesByMember, getProgressComplete, getVocabulary, learn, removeUserFromClass, updateProgress } from "../src/main.js";


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
    res.send(await getProgressComplete(req.query.language, req.user.ID))
});

routerSQL.get('/getVocabulary', requireAuth, async (req, res) => {
    res.send(await getVocabulary(req.query.language))
});

routerSQL.get("/getClassesByMember", requireAuth, async (req, res) => {
    res.send(await getClassesByMember(req.user.ID))
});

routerSQL.post("/addUsertoClass", requireAuth, async (req, res) => {
    if (req.user.role !== "teacher") {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    res.send(await addUserToClass(req.body.username, req.body.IDClass))
});

routerSQL.post("/removeUserfromClass", requireAuth, async (req, res) => {
    if (req.user.role !== "teacher") {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    res.send(await removeUserFromClass(req.body.username, req.body.IDClass))
});

routerSQL.post("/createClass", requireAuth, async (req, res) => {
    if (req.user.role !== "teacher") {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    res.send(await createClass(req.body.classname, req.user.username, req.body.language));
});

routerSQL.post("/getClassProgress", requireAuth, async (req, res) => {
    res.send(await getClassProgress(req.body.IDClass, req.body.language));
})

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