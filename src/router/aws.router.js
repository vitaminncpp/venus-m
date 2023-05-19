import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import * as awsController from "../controllers/aws.controller.js"

const awsRoutes = Router();

awsRoutes.use(auth);
awsRoutes.get("/ec2",awsController.getEC2)


export default awsRoutes;