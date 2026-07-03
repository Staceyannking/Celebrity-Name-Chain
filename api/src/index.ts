import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());
const PORT = 3000;

//--------------- Processing functions ----------------
const varValidate = (variable: unknown, fieldName: string): string | null => {
  if (!variable) return `Please provide a ${fieldName}`;
  if (typeof variable !== "string") return `${fieldName} must be a string.`;
  if (variable.trim().length === 0) return `${fieldName} cannot be empty.`;
  return null;
};

const isInvalidCelebrityName = (name: unknown): string | null => {
  const baseError = varValidate(name, "celebrity name");
  if (baseError) return baseError;
  const value = (name as string).trim();
  const firstLast = value.split(/\s+/);
  if (firstLast.length < 2)
    return "Celebrity name must include first and last name.";
  return null;
};

//--------------- functions to query database with prisma -----------------
const createGame = async (roomCode: string, celebrityName: string) => {
  try {
    const game = await prisma.game.create({
      data: {
        roomCode: roomCode,
        celebrityName: celebrityName,
      },
    });
    return { error: null, data: game };
  } catch (error: any) {
    console.log("Failed to insert answer ", error);
    if (error.code === "P2002")
      return { error: "Room code already exists.", data: null };
    return { error: "Failed to create game.", data: null };
  }
};

//------------------------------------ ROUTES ----------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Celebrity Name Chain API!" });
});

app.post("/games", async (req, res) => {
  try {
    const { roomCode, celebrityName } = req.body;
    console.log(roomCode, celebrityName);
    const roomCodeError = varValidate(roomCode, "room code");
    if (roomCodeError) {
      console.log("room code is empty or null...");
      return res.status(400).json({ message: roomCodeError });
    }
    const celebrityError = isInvalidCelebrityName(celebrityName);
    if (celebrityError) {
      console.log("celebrity name is empty or null...");
      return res.status(400).json({
        message: celebrityError,
      });
    }
    const newGame = await createGame(roomCode, celebrityName);
    console.log(newGame);
    if (newGame.error) return res.status(400).json({ message: newGame.error });
    return res
      .status(201)
      .json({ message: "Game created successfully...", game: newGame.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Please provide both roomCode and celebrityName fields.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
