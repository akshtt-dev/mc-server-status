import express from "express";
import serverList from "../models/serverList.js";
import { updateCount } from "../models/counter.js";
const router = express.Router();
const app = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Home page route
router.get("/", (req, res) => {
  res.render("home", {
    title: "MC Server Status",
    css: "./css/home/style.css",
  });
});

router.post("/post", async (req, res) => {
  const Count = await updateCount();
  const server = new serverList({
    serverIp: req.body.serverIp,
    serverIcon: req.body.serverIcon,
    id: Count,
  });
  await server
    .save()
    .then((result) => {
      res.send("Your server has been added to the database!");
      console.log(`Server added to the database ${req.body.serverIp}`);
    })
    .catch((err) => {
      res.send("There was an error adding your server to the database");
      console.log(err);
    });
});

// Server List page route
router.get("/serverlist", (req, res) => {
  serverList
    .find()
    .then((result) => {
      const arr = [];
      const arr2 = [];
      result.map((server) => {
        arr.push(server.serverIp);
        arr2.push(server.serverIcon);
      });
      res.render("serverlist", {
        title: "Server List",
        servers: arr,
        serverIcons: arr2,
        css: "./css/serverlist/style.css",
      });
    })
    .catch((err) => console.log(err));
});

// About Us page route
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

export default router;
