import express, { type Application, type NextFunction, type Request, type Response } from "express";
import path from "path";
import {ReadDB, SendDB, ConnectDB} from './db_connect.ts';
import 'dotenv/config'; 
import cors from 'cors';
import { title } from "process";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let jsonData;

const app : Application = express();

const port = 3001;

app.use(express.json())

app.use(cors(({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})));

app.use(express.static(path.join(__dirname, '/public')));

app.post('/', (req:Request,res:Response) => {
    res.status(200);
    res.send("Main");
})

app.put('/form', (req:Request,res:Response) => {
    res.json("New GET page");
    
})

app.get('/api/tasks', async function (req:Request, res:Response, next:NextFunction) {
  jsonData = await ReadDB();
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
  SendDB(jsonData);
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
    await ConnectDB();
})