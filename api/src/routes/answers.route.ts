import { Router } from "express";

const answerRouter = Router();

answerRouter.get("/", (req, res) => {
  console.log("Here!");
});

export default answerRouter;