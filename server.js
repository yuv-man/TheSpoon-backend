const express = require('express');
const mongoose = require("mongoose");
const app = express();
const { json } = require('body-parser');

require("dotenv").config();
const port = process.env.PORT;

const users = require('./routes/Users');
const bets = require('./routes/Bets');
const games = require('./routes/Games');

// connect to mongoDb with mongoose
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(
  dbUrl
);

// Middleware
app.use(json());

// Routes
//app.use("/auth", auth);
app.use("/users", users);
app.use("/games", games);
app.use("/bets", bets);

app.get("/", (req, res) => {
  res.send("the spoon");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

