const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../public/helpers');
const database = require("../db/db.json");

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

router.delete("/notes/:note_id", (req, res) => {
    let dbInfo = JSON.parse(fs.readFileSync("./db/db.json"))
    deleteNote(req.params.note_id, dbInfo);
    res.json(true);
});

function deleteNote(id, dbInfo) {
    for (let i = 0; i < dbInfo.length; i++) {
        let note = dbInfo[i];

        if (note.note_id == id) {
            dbInfo.splice(i, 1);
            fs.writeFileSync(
                path.join(_dirname, '../db/db.json'),
                JSON.stringify(dbInfo, null, 2)
            );
            break;
}}}

module.exports = router;
