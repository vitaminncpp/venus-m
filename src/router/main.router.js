import {Router} from "express";
import authRoutes from "./auth.router.js";
import userRoutes from "./user.router.js";
import adminRoutes from "./admin.router.js";
import appRoutes from "./app.router.js";
import auth from "../middleware/auth.middleware.js";


const router = Router()


router.use("/api", appRoutes)
router.use("/api/auth", authRoutes);
router.use(auth)
router.use("/api/user", userRoutes);
router.use("/api/admin", adminRoutes);

export default router;