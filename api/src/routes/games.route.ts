import { createGame, isInvalidCelebrityName, varValidate } from "../methods.js";

import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
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

export default router;
