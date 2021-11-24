import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.end('hello world');
});

app.listen('9000', () => {
    console.log('conexión establecida en http://localhost:9000');
})