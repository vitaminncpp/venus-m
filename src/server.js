import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import appRoutes from "./router/app.router.js";
import userRoutes from "./router/user.router.js";
import authRoutes from "./router/auth.router.js";
import adminRouter from "./router/admin.router.js";
import log from "./utils/logger.utils.js"
import morgan from "morgan";
import db from "../src/database/connect.js"


dotenv.config();

const app = express();

app.use(morgan("dev"))

app.use(express.json())
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRouter)
app.use('/api', appRoutes);
app.listen(process.env.PORT, '0.0.0.0', () => {
  log.info("🚀 is started")
});