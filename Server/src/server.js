import { learn, updateProgress } from "./main.js";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;
app.use(express.json({}));
app.use(cors());

app.get('/', (req, res) => [
    res.send('Hello World!')
]);

app.get('/SQL', async (req, res) => {
    res.send(await learn(req.query.language))
})

app.post('/SQL', async (req, res) => {
    await updateProgress(req.body.text.ID, req.body.language);
    res.end();
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});