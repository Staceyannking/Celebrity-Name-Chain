import "dotenv/config"
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


const app = express();

app.use(express.json());


//--------------- functions to database-----------------
const createGame = async (roomCode: string, celebrityName: string) => {
  try {
    return await prisma.game.create({
      data: {
        roomCode: roomCode,
        celebrityName: celebrityName
      }
    })
  } catch (error) {
    console.log("Failed to insert answer ", error);
  }
}

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.post("/games", async (req, res) => {
  try {

    const { roomCode, celebrityName } = req.body;
    console.log(roomCode, celebrityName);
    if (!roomCode || roomCode === "") {
      console.log("room code is empty or null...");
      return res.status(400).json({ message: "please enter valid room code" });
    }
    if (!celebrityName || celebrityName === "") {
      console.log("celebrity name is empty or null...");
      return res.status(400).json({ message: "please enter valid celebrity name" });
    }

    const newGame = await createGame(roomCode, celebrityName);
    console.log (newGame);
  return res.status(201).json({ message: "game created successfully", game: newGame });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});