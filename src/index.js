import express from 'express';
import url from 'url';
import path from "path";
import morgan from 'morgan';
import bodyParser from "body-parser";
import router from "./router.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
router(app)
app.disable('x-powered-by');
app.set('env', 'development');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'force'}))
app.set('views', path.join(__dirname, 'assets/view'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'assets/public/')));



/*app.get('/search', (req, res) => {
    console.log(req.query.term);
})*/


app.use((req, res, next) => {
    res.render('not_found', {
        pageTitle: 'Node.JS - 404',
        title: 'Yo no tengo recurso pa\'eeso mi\'ermano',
        message: '¿Y que hago mi niño, me lo cargo al hombro o que?',
        picture: '/static/404.gif'
    })
})


app.listen('9000', () => {
    console.log('conexión establecida en http://localhost:9000');
})
