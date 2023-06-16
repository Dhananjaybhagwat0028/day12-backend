import { MongoClient } from "mongodb";
import express from "express";
const app = express();

async function addrecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("mydb");
  const messageColl = db.collection("message");

  let inputDoc = {
    message: req.query.message || "default",
  };
  await messageColl.insertOne(inputDoc);

  await client.close();

  // string response
  // res.send("record added")

  // json response :: preferred
  res.json({ opr: "success" });
}

async function findAllMessage(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("mydb");
  const messageColl = db.collection("message");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}

// http://localhost:4000/addrecord
app.get("/addrecord", addrecord);
app.get("/findAll", findAllMessage);

// http://localhost:4000/
app.listen(4000);
