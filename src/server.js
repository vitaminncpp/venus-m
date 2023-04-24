import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import auth from "./middleware/auth.middleware.js"
import appRoutes from "./router/app.router.js";
import userRoutes from "./router/user.router.js";
import authRoutes from "./router/auth.router.js";

dotenv.config();

const app = express();


app.use(express.json())
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/user', auth, userRoutes)
app.use('/api', appRoutes);

app.listen(process.env.PORT, '0.0.0.0');