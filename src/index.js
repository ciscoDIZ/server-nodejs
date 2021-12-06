import express from 'express';
import path from "path";
import logger from 'morgan';
import bodyParser from "body-parser";
import router from "./router.js";

let _server;

const server = {
    start() {
        const app = express();
        router(app)
        app.disable('x-powered-by');
        app.set('env', process.env.NODE_ENV);

        if(process.env.NODE_ENV !== 'test') {
            app.use(logger('combined'));
        }


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


        _server = app.listen('9000', () => {
            console.log('conexión establecida en http://localhost:9000');
        });
    },
    close() {
        _server.close();
    }
}

export default server;

if (!module.parent) {
    server.start()
}


