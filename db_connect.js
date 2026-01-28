const mongoose = require('mongoose');
const assert = require('assert');
// const db = require('./db/db');
require("dotenv").config();

const cardSchema = new mongoose.Schema({
  simpleId: Number,
  title: {
    type: String,
    required: true
  },
  status:{
    type: String,
    enum: ["active", "deleted", "done"],
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

const uri = process.env.MONGO_DB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const db = mongoose.connection;

module.exports = {ConnectDB, SendDB, ReadDB};


async function ConnectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch (error) {
    console.error(error);
  }
  finally {
    await mongoose.disconnect();
  }
}

async function SendDB(dataArray) {
  await mongoose.connect(uri, clientOptions);
  try {
    const deletedDocs = await Card.deleteMany({});
    const insertedDocs = await Card.insertMany(dataArray);
    console.log(`Number of documents inserted: ${insertedDocs.length}`);
  } catch (err) {
    console.error('Error inserting documents:', err.message);
  }
  finally {
    await mongoose.disconnect();
  }
}

async function ReadDB() {
  await mongoose.connect(uri, clientOptions);
  try {
    const selectedDocs = await Card.find({});
    console.log(`Number of documents read: ${selectedDocs.length}`);
    return selectedDocs;
  } catch (err) {
    console.error('Error reading documents:', err.message);
    return null;
  }
  finally {
    await mongoose.disconnect();
  }
}

