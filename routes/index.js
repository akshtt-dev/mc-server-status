import express from 'express';
import serverList from '../models/serverList.js';
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home', { title: 'MC Server Status' });
    const newServer = new serverList({serverIp: 'Create a new Minecraft server', id: Math.floor(Math.random() * 1000)});
    newServer.save().then(() => console.log('ServerIP added!')).catch(err => console.log(err));
});

// About Us page route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Handling 404 errors
router.use((req, res, next) => {
    res.status(404).render('404', { title: '404', message: 'Page Not Found' });
});

export default router;