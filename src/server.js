import express from 'express';
import cors from 'cors';
import api from './routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', api)
app.use('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

export default app;
