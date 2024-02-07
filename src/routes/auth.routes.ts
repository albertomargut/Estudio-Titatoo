import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";
// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();


router.post("/register", auth, authController.register);
router.post("/login", auth, authController.login);

export default router;



