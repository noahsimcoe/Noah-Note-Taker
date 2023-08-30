// make sure you use "npm i express" to download on the app
const express = require("express");
const path = require("path");
const api = require("./routes/notes");
const htmlRoutes = require("./routes/htmlroutes")
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/", htmlRoutes);
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);