const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");

//models
const WorldCup = require("./models/Worldcup.js");


dotenv.config();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));


//connection to dbS
mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true }, () => {
console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running"));
});

app.set("view engine", "ejs");


// get data
app.get("/", (req, res) => {
  WorldCup.find({}, (err, stats) => {
  res.render("todo.ejs", { todoStats: stats });
  });
  });

  // post text
  app.post('/',async (req, res) => {
    const todoStat = new WorldCup({
    player: req.body.player, goal: req.body.goal, country: req.body.country
    });
    try {
    await todoStat.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });

// Update data

app.route("/edit/:id")
  .get((req, res) => {
  const id = req.params.id;
  WorldCup.find({}, (err, stats) => {
  res.render("todoEdit.ejs", { todoStats: stats, idStat: id });
  });
})
.post((req, res) => {
  const id = req.params.id;
  WorldCup.findByIdAndUpdate(id, { goal: req.body.goal, player: req.body.player, country: req.body.country }, err => {
  if (err) return res.send(500, err);
  res.redirect("/");
  });
});

//Delete
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  WorldCup.findByIdAndRemove(id, err => {
  if (err) return res.send(500, err);
  res.redirect("/");
  });
});