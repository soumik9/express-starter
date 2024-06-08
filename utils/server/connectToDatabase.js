import mongoose from "mongoose"
import config from "./config.js";
import { logger } from "../helpers/logger/index.js";

const connectToDatabase = async () => {
  const uri = `${config.MONGOOSE_URI}/${config.DATABASE_NAME}`;
  try {
    await mongoose.connect(uri, {
      // Specify the write concern mode
      writeConcern: { w: "majority" },
    });
    logger.log("info", "Connected to MongoDB using Mongoose!");
  } catch (error) {
    logger.log("error", `Error connecting database: ${error instanceof Error ? error.message : 'unknown'}`);
    process.exit(1); // @TODO: need to fix logger issue
  }
};

export default connectToDatabase;