// make sure you use "npm i express" to download on the app
const express = require("express");
const api = require("./routes/index");
const PORT = 3001;

const app = express();

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${PORT}`),
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);