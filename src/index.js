import express from 'express';
import path from "path";
import morgan from 'morgan';
import bodyParser from "body-parser";

const app = express();
app.disable('x-powered-by');
app.set('env', 'development');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'force'}))
app.set('views', path.join(__dirname, 'assets/view'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Node.JS',
        title: 'Mi primer servidor Node.JS',
        message: 'pue vah ser que pug mola!'
    });
});

app.listen('9000', () => {
    console.log('conexión establecida en http://localhost:9000');
})