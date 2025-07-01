import { Server } from "http";
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

let server: Server;

const port = 5000;

async function main() {
  try {
    {
      await mongoose.connect(process.env.DB_URI as string);
      console.log("Connected to MongoDB successfully");
      server = app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main();
