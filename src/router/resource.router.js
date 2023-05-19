import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import {test} from "../test/controller.test.js";

const router = Router();

router.use(auth)


// Book Resource
router.post("/:resource/book", test)

// Get the booking status of the resource
router.get("/:resource/book", test)

// Update booking
router.put("/:resource/book", test)

// Get Resource by ID
router.get("/:resource", test)

// Update Resource
router.put("/:resource", test)

// Delete Resource
router.put("/:resource", test)

// Get All resources
router.get("/", test)

// Create new Resource
router.post("/", test)
export default router;
