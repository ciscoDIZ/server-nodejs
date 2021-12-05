import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Node.JS - Home',
        title: 'Mi primer servidor Node.JS',
        message: 'Pue vah ser que pug mola!',
        term: req.query.term
    });
});

export default router;