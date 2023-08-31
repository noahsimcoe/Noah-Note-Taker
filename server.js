// make sure you use "npm i express" to download on the app
// Imports list
const express = require("express");
const path = require("path");
const api = require("./routes/notes");
const htmlRoutes = require("./routes/htmlroutes")

// Specifies which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Initializes an isntance of Express.js
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/", htmlRoutes);

// Invokes app.use() and serve static files from the '/public' folder
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);