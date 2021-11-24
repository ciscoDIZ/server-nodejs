import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";

const app = express();
app.disable('x-powered-by');
app.set('env', 'development');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'force'}))

app.get('/', (req, res) => {
    res.end('hello world');
});

app.listen('9000', () => {
    console.log('conexión establecida en http://localhost:9000');
})