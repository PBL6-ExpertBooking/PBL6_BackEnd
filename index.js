import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3000;

async function main() {
  await mongoose.connect(CONNECTION_URL);
  logger.info("Connected to MongoDB");
  app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
}

main().catch((err) => logger.error(err));
