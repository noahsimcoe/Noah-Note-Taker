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
            id: uuidv4(),
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

router.delete("/notes/:id", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        const noteList = JSON.parse(data);
        const updatedNoteList = noteList.filter( (note) => {return note.id != req.params.id});
        fs.writeFile("db/db.json", JSON.stringify(updatedNoteList, null, 4), (err) => {
            res.json(updatedNoteList);
        });
    });
  })

module.exports = router;
