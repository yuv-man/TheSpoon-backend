import express, { Router, json } from "express";
import { connect, set } from "mongoose";
const app = express();
const router = Router();
import { json as _json } from 'body-parser';
import users from './routes/Users';
import auth from './routes/Auth';
import bets from './routes/Bets';

require("dotenv").config();
const port = process.env.PORT;


import User, { findById, find } from './models/User';
import Bet, { findById as _findById, find as _find } from './models/Bet';
import { findById as __findById } from './models/Game';

// connect to mongoDb with mongoose
const dbUrl = process.env.DATABASE_URL;
connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    if (error) { 
      console.log("Error!" + error);
    } else {
      console.log("Connencted to db");
    }
  }
);
set("useFindAndModify", false);
set("useCreateIndex", true);

// Middleware
app.use(_json());

// Routes
//app.use("/recipes", recipes);
app.use("/users", users);
app.use("/auth", auth);
app.use("/bets", bets);

app.get("/", (req, res) => {
  res.send("the spoon");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});





//connect('mongodb://localhost/worldcup', { useNewUrlParser: true, useUnifiedTopology: true });

