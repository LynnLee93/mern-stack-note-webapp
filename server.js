require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

//configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to mongodb
const password = process.env.NOTE_DB_PW
mongoose.connect("mongodb+srv://lynn:password@cluster0.fqg0v.mongodb.net/newItemsDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})

//data schema
const itemSchema = {
  title: String,
  description: String
}

//data model
const Item = mongoose.model("Item", itemSchema);

//read route
app.get("/items", (req, res) => {
  Item.find()
  .then(items => res.json(items))
  .catch((err) => res.status(400).json("Error:" + err))
});

//create route
app.post("/newitem", (req, res) => {
  const newItem = new Item(
    {
      title: req.body.title,
      description: req.body.description
    }
  );
  newItem.save()
  .then(item => console.log(item))
  .catch((err) => res.status(400).json("Error: " + err));
})

//delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete({_id: id}, (req, res, err) => {
    if(!err) {
      console.log("Item deleted");
    } else {
      console.log(err);
    }
  });
});

//update route
app.put("/put/:id", (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description
  }
  Item.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: updatedItem},
    (req, res, err) => {
      if(!err) {
        console.log("item updated");
      } else {
        console.log(err);
      }
    });
  });


if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolved(__dirname, "client", "build", "index.html"));
  })
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.listen(port, function() {
  console.log("Server is running on port 3001");
})
