import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

main().catch(err => console.log(err)).finally(() => console.log('Connected to the database!'));
async function main() {
  await mongoose.connect('mongodb://admin:4NUA8J4LDY8YE4AC@pnode3.danbot.host:5365/?authSource=admin');
}

import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(join(__dirname, 'public')));

// Setting up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views')); // Updated line

// Middleware to remove trailing slashes from URLs
app.use((req, res, next) => {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
      const query = req.url.slice(req.path.length);
      res.redirect(301, req.path.slice(0, -1) + query);
    } else {
      next();
    }
});

import indexRouter from './routes/index.js';
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
