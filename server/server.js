const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/suitability", (req, res) => {
  fs.readFile("./server/resp.json", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

/* hosting files built */
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
