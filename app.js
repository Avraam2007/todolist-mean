const express = require("express");
const path = require("path");
const ConnectDB = require('./db_connect.js');
require("dotenv").config();
const Card = require("./config/cards.js");
const cors = require('cors');
const { title } = require("process");
let jsonData = {msg: 'This is CORS-enabled for all origins!'};

const app = express();

const port = 3001;

app.use(express.json())

app.use(cors(({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})));

app.use(express.static(path.join(__dirname, '/public')));

app.post('/', (req,res) => {
    res.status(200);
    res.send("Main");
})

app.put('/form', (req,res) => {
    res.json("New GET page");
    
})

app.get('/api/tasks', async function (req, res, next) {
  jsonData = await ConnectDB.ReadDB();
  res.json(jsonData);
  // res.status(200).json({
  //   message: 'JSON data retrieved successfully',
  //   data: jsonData
  // });
})

app.post('/api/tasks', function (req, res, next) {
  jsonData = req.body;
  res.status(200).json({
    message: 'JSON data received successfully',
    data: jsonData
  })
  ConnectDB.SendDB(jsonData);
})

app.get('/lol', (req, res) => {
  res.status(418).send('<h1 align="center">LOL</h1>');
});

app.use((req,res) => {
    res.status(404);
    res.send('<h1 align="center">Error 404: The page doesn\'t exist</h1>');
})

app.listen(process.env.port || port, async () => {
    console.log("App is listening on port " + port);
    await ConnectDB.ConnectDB();
})