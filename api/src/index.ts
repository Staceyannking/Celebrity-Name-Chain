import express from "express";
import postGamesRoute from "./routes/games.route.js";

const app = express();
app.use(express.json());
const PORT = 3000;

//------------------------------------ ROUTES ----------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.use("/games", postGamesRoute);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
