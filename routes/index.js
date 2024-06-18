import express from 'express';
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home', { title: 'MC Server Status' });
});

// About Us page route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Handling 404 errors
router.use((req, res, next) => {
    res.status(404).render('404', { title: '404', message: 'Page Not Found' }); // Ensure you have a 404.handlebars file
});

export default router;