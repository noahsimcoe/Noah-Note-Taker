const uuid = require("uuidv4");
const router = require("express").Router();
const fs = require("fs");

var notes;

router.get("/notes", async (req, res) => {
    try {
        const data = await fs.readFileSync("./db/db.json", "utf8");
        console.log(data);
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

router.post("/notes", async (req, res) => {
    try {
        const data = await JSON.parse(fs.readFileSync("./db/db.json"), "utf8") || [];
        var newNote = {id: uuid, title, text};
        return this.data.then((notes) => [...data, newNote]).then((updateNotes) => this.write(updateNotes)).then(() => newNote);
        //updateJsonFile();
        //console.log(req.body);
        //console.log(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});

router.delete("/notes/:id", async (req, res) => {
    try {
        notes.splice(req.params.id, 1);
        updateJsonFile();
        console.log(`Deleted note with id ${req.params.id}`);
        }
    catch (error) {
        console.log(error)
    }
});

function updateJsonFile() {
    fs.writeFile("db/db.json",JSON.stringify(notes,'\t'), err => {
        if (err) throw err;
        return true;
    });
}

module.exports = router;
