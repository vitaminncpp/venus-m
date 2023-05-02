import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    const dbUri = process.env.DATABASE_URL;
    mongoose.set("strictQuery", true);
    this.connection = mongoose.connect(dbUri);
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance();
