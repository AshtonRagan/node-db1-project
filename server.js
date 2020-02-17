const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Sorry could not get accounts" });
    });
});

server.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(accounts => {
      res.status(200).json({ accounts });
    })
    .catch(err => {
      console.log(err);
    });
});

server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      return res.status(200).json(ids);
    })
    .catch(err => {
      console.log(console.log(err));
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
    });
});

server.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = server;
