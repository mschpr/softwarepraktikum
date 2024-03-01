import express from "express";
import { addUserToClass, createClass, getClassProgress, getClassesByMember, getProgressPerUser, getVocabulary, learn, removeUserFromClass, updateProgress } from "./queries.js";
import { requireAuth } from "./requireAuth.js";


let routerSQL = express.Router();

routerSQL.get('/learn', requireAuth, async (req, res) => {
    res.send(await learn(req.query.language, req.user.ID))
});

routerSQL.post('/updateProgress', requireAuth, async (req, res) => {
    await updateProgress(req.body.text.ID, req.user.ID, req.body.language);
    res.end();
});

routerSQL.get('/getProgressPerUser', requireAuth, async (req, res) => {
    res.send(await getProgressPerUser(req.query.language, req.user.ID))
});

routerSQL.get('/getVocabulary', requireAuth, async (req, res) => {
    res.send(await getVocabulary(req.query.language))
});

routerSQL.get("/getClassesByMember", requireAuth, async (req, res) => {
    res.send(await getClassesByMember(req.user.ID))
});

routerSQL.post("/addUsertoClass", requireAuth, async (req, res) => {
    if (await fetch(`http://localhost:3001/auth/isTeacher`, { credentials: "include" })) {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    await addUserToClass(req.body.username, req.body.IDClass);
    res.end();
});

routerSQL.post("/removeUserfromClass", requireAuth, async (req, res) => {
    if (await fetch(`http://localhost:3001/auth/isTeacher`, { credentials: "include" })) {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    await removeUserFromClass(req.body.username, req.body.IDClass);
    res.end();
});

routerSQL.post("/createClass", requireAuth, async (req, res) => {
    if (await fetch(`http://localhost:3001/auth/isTeacher`, { credentials: "include" })) {
        res.status(403).json({
            msg: "Keine Berechtigung",
            code: 403
        })
    }
    await createClass(req.body.classname, req.user.username, req.body.language);
    res.end();
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