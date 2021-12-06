import express from "express";
const router = express.Router();


router.get('/user/:user', (req, res) => {
    res.render('user', {
        pageTitle: 'Node.JS - Usuario',
        title: 'Usuario',
        message: `Bienvenido usuario ${req.params.user}`,
    })
});

export default router;