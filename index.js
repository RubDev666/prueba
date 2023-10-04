import express from 'express';
import db from './db/coches.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json(db);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT);

console.log(`Servidor oyendo en ${PORT}`);