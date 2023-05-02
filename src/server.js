import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import appRoutes from "./router/app.router.js";
import userRoutes from "./router/user.router.js";
import authRoutes from "./router/auth.router.js";
import db from "./database/connect.js"
import log from "./utils/logger.js"

dotenv.config();

const app = express();


app.use(express.json())
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api', appRoutes);
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, '0.0.0.0', () => {
  log.info("Server is started")
});