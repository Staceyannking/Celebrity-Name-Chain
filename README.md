## Celebrity Name Chain Game

### Collaborators:

1.  Stacey Ann [Staceyannking (Staceyann king)](https://github.com/Staceyannking)
2.  Prayash [CyberAsec1](https://github.com/CyberAsec1)
3.  Yasmine Mohamed [YasmineRaef (Yasmine_Raef_M.)](https://github.com/YasmineRaef)

### Template and Project:

Create a Full-stack Celebrity Name chain game with **Ionic/React** client for _frontend_, **Express JS** for _backend_ routes and **PgAdmin4** with _prisma_ for the database server.
The project should at least have the following minimum routes:

1. _POST_ `"/games"` route: The user provides a valid `roomCode`, and beginning `celebrity_name` to create a new game record.
2. _GET_ `"/currentGames"` route: Returns all the games with their roomCodes and \*\*most recent answer for each game.
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

2. Created the first home route `"/"` for showing the main home page and returning a custom message.

3. Created the **POST** `"/games"` route with complete error checking and status code handling that communicated with _Prisma_ to write the new records in the game table.

```js
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
```

4. Created the **GET** `"/currentGames"` route that retrieves the current games that already exist in the game table.

```js
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
    return res.status(500).json({ message: "internal server error.." });
  }
});
```

5. Created a main **Ionic/React** _Home Page_ that has card buttons that navigate to other pages.
   ![HomePage](/images/HomePage.png)

6. Connected the `"/"` home route, **POST** `"/games"` route and the **GET** `"/currentGames"` route to the frontend UI with **Ionic/React** to each `ion-card`.

7. Created the **POST** `"/answer"` route that allows users to submit answers for a specific game. The route validates the request, stores answers in the database, updates the celebrity name, and handles different error cases with appropriate status codes. We also created the React/Ionic UI connection that communicates with this route and displays the submitted answers.

8. Created the **GET** `"/answerslist/:roomCode"` route that retrieves all submitted answers for a specific room code. This route is connected with the Ionic React frontend to display the answer list for each game.

```ts
app.get("/answerslist/:roomCode", async (req, res) => {
  const roomCodeID = req.params.roomCode;

  const answers = await answersRecords(roomCodeID);

  if (!answers) {
    return res.send("No answers posted yet...");
  }

  return res.json(answers);
});
```

9. Created reusable methods in the `methods.ts` file using Prisma to handle database operations. These methods are used to create, retrieve, and update game and answer data across the API routes.

10. Tested our backend routes hosting our local version on **Ngrok** using `ngrok http 3000`.

### Cloning & Environment settup:

#### A) For Prisma migrations:

1. For prisma and database syncing, cd inside `api` folder to have _Prisma_ dependencies visible.
2. Run `yarn install` to load your _node_modules_.
3. Copying the .env.example file in a new .env file by running the following in the terminal: `cp .env.example .env` and modify the _DATABASE_URL_ in the _.env_ file. **Make sure to change the password to your local password, and change the PORT number if you use another.**
4. Run `yarn prisma:migrate` to connect with PostgreSQL on your machine and sync the _Prisma_ models with the database and generate the tables in PgAdmin.

_Summarized commands_:

```bash
cd api
yarn install
cp .env.example .env #Change port and password accordingly
yarn prisma:migrate
```

---

#### B) For setting up the backend and frontend on your local machine:

1. Open your terminal, cd inside the `api` folder -> (`cd api`). Then run the following:

```bash
  cd api
  yarn install
  yarn add cors
  # Once all is good with the packages
  yarn dev
```

2. Open another terminal and now cd inside `client` folder -> (`cd client`):
   a| copy the _.env.example_ in a new _.env_ file : `cp .env.example .env`
   b| run the following in the terminal:

```bash
  cd client
  yarn install
  yarn dev
```

## --> Now, you should be able to go to `http://localhost:5173/` and see the home page for the routes.
