import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import log from "./utils/logger.utils.js"
import morgan from "morgan";
import db from "../src/database/connect.js"
import router from "./router/main.router.js";

dotenv.config();

const database = db;
const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(cors());
app.use(router)

app.listen(process.env.PORT, '0.0.0.0', () => {
  log.info("🚀 is started")
});