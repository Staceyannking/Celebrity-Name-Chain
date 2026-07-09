import express from "express";
import postGamesRoute from "./routes/games.route.js";
import answerRoute from "./routes/answers.route.js";
import cors from "cors";
import { gamesRecords, gameRecord, varValidate } from "./methods.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

//------------------------------------ ROUTES ----------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.use("/games", postGamesRoute);
app.use("/answers", answerRoute);

app.get("/currentGames", async (req, res) => {
  try {
    const games = await gamesRecords();
    if (!games || games.length === 0) {
      console.log("games table is empty....");
      return res.status(404).json({ message: "no games create yet..." });
    }
    res
      .status(200)
      .json({ message: "Retrieved games...", gamesRecords: games });
  } catch (error) {
    console.log("database server error.... ");
    return res.status(500);
  }
});

app.get("/game/:roomCode", async (req, res) => {
  const roomCodeID = req.params.roomCode;
  console.log(roomCodeID);
  const roomCodeError = varValidate(roomCodeID, "roomCode");
  if (roomCodeError) {
    console.log("Error: ", roomCodeError);
    return res.status(400).json({ error: roomCodeError, data: null });
  }
  const gameObject = await gameRecord(roomCodeID);
  console.log("retrieved game: ", gameObject);
  if (gameObject.error) {
    return res.status(404).json(gameObject);
  }
  return res.status(200).json(gameObject);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
