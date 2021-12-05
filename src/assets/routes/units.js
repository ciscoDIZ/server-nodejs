import express from "express";
const router = express.Router();

router.get('/temario', (req, res) => {
    res.render('temario',{
        pageTitle: 'Node.JS - Temario',
        title: 'Temario',
        message: 'Tas movio a temario primo!'
    })
});

export default router;