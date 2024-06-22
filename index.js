import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

main()
  .then((res) => console.log("Connected to database."))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(join(__dirname, "public")));

// Setting up Handlebars as the view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views")); // Updated line

// Middleware to remove trailing slashes from URLs
app.use((req, res, next) => {
  if (req.path.substr(-1) === "/" && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

import indexRouter from "./routes/index.js";
import cocRouter from "./routes/coc.js";
app.use("/", indexRouter);
app.use("/coc", cocRouter);
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404", message: "Page Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
