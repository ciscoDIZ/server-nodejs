import express from 'express';
import url from 'url';
import path from "path";
import morgan from 'morgan';
import bodyParser from "body-parser";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.disable('x-powered-by');
app.set('env', 'development');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'force'}))
app.set('views', path.join(__dirname, 'assets/view'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'assets/public/')));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Node.JS - Home',
        title: 'Mi primer servidor Node.JS',
        message: 'Pue vah ser que pug mola!',
        term: req.query.term
    });
});
app.get('/temario', (req, res) => {
    res.render('temario',{
        pageTitle: 'Node.JS - Temario',
        title: 'Temario',
        message: 'Tas movio a temario primo!'
    })
})
/*app.get('/search', (req, res) => {
    console.log(req.query.term);
})*/
app.get('/:user', (req, res) => {
    res.render('user', {
        pageTitle: 'Node.JS - Usuario',
        title: 'Usuario',
        message: `Bienvenido usuario ${req.params.user}`,
    })
});

app.use((req, res, next) => {
    res.render('not_found', {
        pageTitle: 'Node.JS - 404',
        title: 'Yo no tengo recurso pa\'eso mi\'ermano',
        message: '¿Y que hago, me lo cargo al hombro o que?'
    })
})


app.listen('9000', () => {
    console.log('conexión establecida en http://localhost:9000');
})
