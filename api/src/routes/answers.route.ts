import { Router } from "express";
import {
  answersRecords,
  createAnswer,
  findAnswer,
  findRoom,
  retrieveLastAnswer,
  updateCelebrityName,
} from "../methods";

const answerRouter = Router();

answerRouter.post("/", async (req, res) => {
  const { roomCode, username, answer } = req.body;

  if (!roomCode || !username || !answer) {
    return res
      .status(400)
      .json({ error: "roomCode, username, and answer are required." });
  }

  try {
    // ---------------- Check if room exists ----------------
    const room = await findRoom(roomCode);

    if (!room) {
      return res.status(404).json({ error: "Room does not exist." });
    }

    // ------- Check if answer already exists for this roomCode -------
    const existingAnswer = await findAnswer(roomCode, answer);

    if (existingAnswer) {
      return res.status(400).json({
        error: "This answer has already been submitted for this room.",
      });
    }

    // ----- Retrieve the last submitted answer for this roomCode ----
    const lastAnswer = await retrieveLastAnswer(roomCode);

    if (lastAnswer) {
      // ----  Validate starting letter rule -----------
      const parts = lastAnswer.answer.trim().split(" ");
      const lastName = parts[parts.length - 1];
      const requiredLetter = lastName[0].toLowerCase();

      if (answer[0].toLowerCase() !== requiredLetter) {
        return res.status(400).json({
          error: `Answer must start with '${requiredLetter.toUpperCase()}' based on previous answer '${lastAnswer.answer}'.`,
        });
      }
    }

    //------------------ Create the answer -------------
    const newAnswer = await createAnswer(roomCode, username, answer);

    // --------Update the celebrityName for this roomCode ------
    await updateCelebrityName(roomCode, answer);

    //----- Return updated list of answers for live UI refresh --> React /Ionic page------
    const allAnswers = await answersRecords(roomCode);

    return res.status(201).json({
      message: "Answer submitted and celebrity name updated.",
      newAnswer,
      answers: allAnswers,
    });
  } catch (err: any) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(400).json({
        error: "This answer has already been submitted for this room.",
      });
    }

    return res.status(500);
  }
});

export default answerRouter;
