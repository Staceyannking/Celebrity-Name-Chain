import express from "express";


const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});