import express from "express";
import postGamesRoute from "./routes/games.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

//------------------------------------ ROUTES ----------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.use("/games", postGamesRoute);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
