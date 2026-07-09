import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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

const gamesRecords = async () => {
  try {
    console.log("Prisma client connected ...");
    const currentGames = await prisma.game.findMany();
    console.log("Games: ", currentGames);
    return currentGames;
  } catch (error) {
    console.log("Failed to error...: ", error);
    return null;
  }
};

const gameRecord = async (roomCode: string) => {
  try {
    console.log("retrieving game record....");
    const currentGame = await prisma.game.findUnique({
      where: { roomCode: roomCode },
    });
    console.log(currentGame);
    if (!currentGame) {
      console.log("Game does not exist...");
      return {
        error: "Game code does not exist, please create a game first..",
        data: null,
      };
    }
    return { error: null, data: currentGame };
  } catch (error) {
    console.log("failed to error:", error);
    return { error: "Database error occured.", data: null };
  }
};

const findRoom = async (roomCode: string) => {
  return await prisma.game.findUnique({
    where: { roomCode },
  });
};

const findAnswer = async (roomCode: string, answer: string) => {
  return await prisma.answer.findUnique({
    where: {
      roomCodeID_answer: {
        roomCodeID: roomCode,
        answer: answer.trim(),
      },
    },
  });
};

const retrieveLastAnswer = async (roomCode: string) => {
  return await prisma.answer.findFirst({
    where: { roomCodeID: roomCode },
    orderBy: { createdAt: "desc" },
  });
};

const createAnswer = async (
  roomCode: string,
  username: string,
  answer: string,
) => {
  return await prisma.answer.create({
    data: {
      roomCodeID: roomCode,
      username,
      answer: answer.trim(),
    },
  });
};

const updateCelebrityName = async (roomCode: string, answer: string) => {
  return await prisma.game.update({
    where: { roomCode },
    data: { celebrityName: answer.trim() },
  });
};

const answersRecords = async (roomCode: string) => {
  return await prisma.answer.findMany({
    where: { roomCodeID: roomCode },
    orderBy: { createdAt: "asc" },
  });
};

export {
  varValidate,
  isInvalidCelebrityName,
  createGame,
  gamesRecords,
  gameRecord,
  findRoom,
  findAnswer,
  retrieveLastAnswer,
  createAnswer,
  updateCelebrityName,
  answersRecords,
};
