-- CreateTable
CREATE TABLE "Game" (
    "roomCode" TEXT NOT NULL,
    "celebrityName" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("roomCode")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "roomCodeID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_roomCodeID_answer_key" ON "Answer"("roomCodeID", "answer");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_roomCodeID_fkey" FOREIGN KEY ("roomCodeID") REFERENCES "Game"("roomCode") ON DELETE RESTRICT ON UPDATE CASCADE;
