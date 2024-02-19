import { learn, getVocabulary, updateProgress } from "./main.js";
import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => [
    res.send('Hello World!')
]);

app.get('/SQL', async (req, res) => {
    res.send(await learn())
})

app.post('/SQL', async (req, res) => {
    res.send(await updateProgress(req.body));
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});