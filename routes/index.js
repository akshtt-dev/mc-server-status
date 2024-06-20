import express from 'express';
import serverList from '../models/serverList.js';
const router = express.Router();
const app = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Home page route
router.get('/', (req, res) => {
    res.render('home', { title: 'MC Server Status' });
});

router.post('/post', async (req, res) => {
    const randomId = Math.floor(Math.random() * 1000);
    const server = new serverList({ serverIp: req.body.serverIp, id: randomId }); 
    await server.save().then(result => {
        res.send('Your server has been added to the database!');
        console.log(`Server added to the database ${req.body.serverIp}`)
})
    .catch(err => {
        res.send('There was an error adding your server to the database');
        console.log(err)
    });
});

// Server List page route
router.get('/serverlist', (req, res) => {
    serverList.find().then(result => {
        res.render('serverlist', { title: 'Server List', servers: result });
    }).catch(err => console.log(err));
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