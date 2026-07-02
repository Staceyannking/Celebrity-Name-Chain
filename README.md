## Celebrity Name Chain Game

### Collaborators:

1.  Stacey Ann [Staceyannking (Staceyann king)](https://github.com/Staceyannking)
2.  Prayash
3.  Yasmine Mohamed [YasmineRaef (Yasmine_Raef_M.)](https://github.com/YasmineRaef)

### Template and Project:

Create a Full-stack Celebrity Name chain game with **Ionic/React** client for _frontend_, **Express JS** for _backend_ routes and **PgAdmin4** with _prisma_ for the database server.
The project should at least have the following minimum routes:

1. _POST_ `"/games"` route: The user provides a valid `roomCode`, and beginning `celebrity_name` to create a new game record.
2. _GET_ `"/games"` route: Returns all the games with their roomCodes and \*\*most recent answer for each game.
3. _GET_ `"/games/:roomCode"` route: Returns the most recent game for the specific provided `roomCode` if exists, otherwise the default celebrity name.
4. _POST_ `"/answers"` route: Submits an answer to the specific game, where the user provides the `roomCode`, `username`, and `answer`.

###### Disclaimer: The project was built on the following prebuilt boilerplate template for yarn and prisma: [jonathan-chin/citytech-ttpr-2026-summer-celebrity-name-chain: Boilerplate for the Celebrity Name Chain full-stack group project (CityTech TTP 2026 Summer)](https://github.com/jonathan-chin/citytech-ttpr-2026-summer-celebrity-name-chain)

---

### Built:

1. Created the Game and Answer models in `prisma.schema` and generated the migrations folder to sync the models with PostgreSQL. _Keeping in mind the 1:1 relation between game and answer where each game can have several answers._

```prisma
model Game {
  roomCode      String @id
  celebrityName String

  answers Answer[]
}

model Answer {
  id            Int     @id @default(autoincrement())
  roomCodeID    String
  username      String
  answer        String
  createdAt     DateTime @default(now())

  game          Game     @relation(fields: [roomCodeID], references: [roomCode])

  @@unique([roomCodeID, answer])
}
```

---

### Cloning:

#### A) For Prisma migrations:

1. For prisma and database syncing, cd inside `api` folder to have _Prisma_ dependencies visible.
2. Run `yarn install` to load your _node_modules_.
3. Copying the .env.example file in a new .env file by running the following in the terminal: `cp .env.example .env` and modify the _DATABASE_URL_ in the _.env_ file. **Make sure to change the password to your local password, and chagne the PORT number if you use another.**
4. Run `yarn prisma:migrate` to connect with PostgreSQL on your machine and sync the _Prisma_ models with the database and generate the tables in PgAdmin.

---
