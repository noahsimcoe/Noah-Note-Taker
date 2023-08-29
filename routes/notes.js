const router = require("express").Router();
const fs = require("fs");

router.get("/", async (req, res) => {
    try {
        const data = await fs.readFileSync("./db/db.json");
        if (!data) {
            return res.status(500).json({ message: "error reading data" });
        }
        return res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});

router.post("/", async (req, res) => {
    try {
        const data = await JSON.parse(fs.readFileSync("./db/db.json")) || [];
        console.log(req.body);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});

router.delete("/:id", async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router;
