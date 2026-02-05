import * as mongoose from 'mongoose';
import 'dotenv/config'; 
import assert from 'assert';
import { title } from 'process';

export interface ICard {
    id: number,
    title: String,
    status: "active" | "deleted" | "done"
}

const cardSchema = new mongoose.Schema<ICard>({
  id: Number,
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

const Card = mongoose.model<ICard>('Card', cardSchema);

const uri = process.env.MONGO_DB_URL!;
const clientOptions:mongoose.ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true },socketTimeoutMS: 45000,maxIdleTimeMS: 30000,};

const db = mongoose.connection;


export async function ConnectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch (error) {
    console.error(error);
  }
  finally {
    await mongoose.disconnect();
  }
}

export async function SendDB(dataArray:string) {
  await mongoose.connect(uri, clientOptions);
  try {
    await Card.deleteMany({});
    const insertedDocs = await Card.insertMany(dataArray);
    console.log(`Number of documents inserted: ${insertedDocs.length}`);
  } catch (err:any) {
    console.error('Error inserting documents:', err.message);
  }
//   finally {
//     await mongoose.disconnect();
//   }
}

export async function deleteDB(dataArray:string) {
  await mongoose.connect(uri, clientOptions);
  try {
    const deletedDocs =await Card.deleteMany({});
    console.log(`All of the documents deleted!`);
  } catch (err:any) {
    console.error('Error deleting documents:', err.message);
  }
//   finally {
//     await mongoose.disconnect();
//   }
}

export async function ReadDB() {
  await mongoose.connect(uri, clientOptions);
  try {
    const selectedDocs = await Card.find({});
    console.log(`Number of documents read: ${selectedDocs.length}`);
    return selectedDocs;
  } catch (err:any) {
    console.error('Error reading documents:', err.message);
    return null;
  }
//   finally {
//     await mongoose.disconnect();
//   }
}

