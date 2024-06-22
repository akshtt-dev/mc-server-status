import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route handler
router.get("/", async (req, res) => {
  res.render("coc", {
    title: "Clash Of Clans",
    favicon: "./src/coc/sword.png",
    faviconFormat: "image/png",
    css: "./css/coc/style.css",
  });
});

router.post("/post", async (req, res) => {
  try {
    const playerTag = encodeURIComponent(req.body.playerTag);
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/${playerTag}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.COC_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      res.json({ error: "Player not found" });
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

export default router;
