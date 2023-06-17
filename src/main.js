import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allowing everyone.

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

function helloPost(req, res) {
  let result = { opr: true };
  res.json(result);
}

// NEW TODO API
async function addTodo(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("todo");

  let inputDoc = {
    task: req.query.task,
    description: req.query.description,
  };
  await messageColl.insertOne(inputDoc);

  await client.close();

  res.json({ opr: "success" });
}

async function findAllTodo(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("todo");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}

async function addUserRecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("user");

  let inputDoc = {
    username: req.query.username,
    password: req.query.password,
    email: req.query.email,
    mobile: req.query.mobile,
  };
  await messageColl.insertOne(inputDoc);

  await client.close();

  res.json({ opr: "success" });
}

async function findAllUser(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("user");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}

// http://localhost:4000/addrecord
app.get("/addrecord", addrecord);
app.get("/findAll", findAllMessage);
app.post("/hello", helloPost);
app.get("/addtodo", addTodo);
app.get("/find-all-todo", findAllTodo);
app.get("/adduser", addUserRecord);
app.get("/find-all-user", findAllUser);

// http://localhost:4000/
app.listen(4000);
