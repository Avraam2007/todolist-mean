import express, { type NextFunction, type Response, type Request } from "express";
import { ReadDB, SendDB } from "../config/db_connect.ts";

let jsonData;

const router = express.Router();

router.route('/').get(async function (req:Request, res:Response, next:NextFunction) {
  try {
    jsonData = await ReadDB();

    if(!jsonData){
        return res.status(404).send({
            message: 'Error',
            data: jsonData
        })
    }
    res.json(jsonData);
  } catch (error) {
    res.status(200).send({ status: 'Error', error: error });
  }
  // res.status(200).json({
  //   message: 'JSON data retrieved successfully',
  //   data: jsonData
  // });
})

router.route('/').post(function (req, res, next) {
  jsonData = req.body;
  res.status(200).json({
    message: 'JSON data received successfully',
    data: jsonData
  })
  SendDB(jsonData);
})

router.route('/:id').put(function (req, res, next) {
  jsonData = req.body;
  res.status(200).json({
    message: 'JSON data received successfully',
    data: jsonData
  })
  SendDB(jsonData);
})

router.route('/').delete(function (req, res, next) {
  jsonData = req.body;
  res.status(200).json({
    message: 'JSON data deleted successfully',
    data: jsonData
  })
  SendDB(jsonData);
})

export default router;