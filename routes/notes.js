//const uuid = require("uuid");
const router = require("express").Router();
const fs = require("fs");

const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../public/helpers');

//var notes;

// router.get("/notes", async (req, res) => {
//     try {
//         const data = await fs.readFileSync("./db/db.json", "utf8");
//         console.log(data);
//         if (!data) {
//             return res.status(500).json({ message: "error reading data" });
//         }
//         return res.json(data);
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: error })
//     }
// });

router.get("/notes", (req, res) => (
    readFromFile("./db/db.json")).then((data) => res.json(JSON.parse(data)))
);

router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        const response = {
            status: "success",
            body: newNote,
        };
        res.json(response);
    } else {
        res.json("Error in posting note");
    }
});

router.delete(`/notes/${id}`, (req, res) => {
    saveData
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

// router.delete("/notes/:id", async (req, res) => {
//     try {
//         notes.splice(req.params.id, 1);
//         updateJsonFile();
//         console.log(`Deleted note with id ${req.params.id}`);
//         }
//     catch (error) {
//         console.log(error)
//     }
// });

// router.post("/notes", async (req, res) => {
//     try {
//         const data = await JSON.parse(fs.readFileSync("./db/db.json"), "utf8") || [];
//         var newNote = {id: uuid, title: title, text: text};
//         return this.data.then((notes) => [...data, newNote]).then((updateNotes) => this.write(updateNotes)).then(() => newNote);
//         //updateJsonFile();
//         //console.log(req.body);
//         //console.log(data);
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: error })
//     }
// });

// router.delete("/notes/:id", async (req, res) => {
//     try {
//         notes.splice(req.params.id, 1);
//         updateJsonFile();
//         console.log(`Deleted note with id ${req.params.id}`);
//         }
//     catch (error) {
//         console.log(error)
//     }
// });

// function updateJsonFile() {
//     fs.writeFile("db/db.json",JSON.stringify(notes), err => {
//         if (err) throw err;
//         return true;
//     });
// }

module.exports = router;
