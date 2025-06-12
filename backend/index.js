const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.get("/", (_req, res) => res.json({ msg: "Funciona" }));
app.listen(3000, () => console.log("Backend en http://localhost:3000"));
