const express = require("express");
const app = express();
app.use(express.json());
app.use(require("cors")());

app.get("/api/test", (_req, res) => res.json({ msg: "Funciona 🎉" }));

app.listen(3000, () => console.log("✅ Backend en http://localhost:3000"));
