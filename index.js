import dotenv from "dotenv";
import mongoose, { MongooseError } from "mongoose";
import app from "./app.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3000;

async function main() {
  await mongoose.connect(CONNECTION_URL);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

main().catch((err) => console.log(err));
