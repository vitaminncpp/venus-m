import {Router} from "express";
import authRoutes from "./auth.router.js";
import userRoutes from "./user.router.js";
import resourceRoutes from "./resource.router.js";
import {statusCheck} from "../controllers/app.controller.js";
import {test} from "../test/controller.test.js";
import roleRoutes from "./role.router.js";

const router = Router()

router.get("/check", statusCheck);
router.get("/health", test);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/resources", resourceRoutes);

export default router;