import express from "express";
import { AuthController } from "../controllers/AuthController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/register", authController.registerArtist);
router.post("/register", authController.registerClient);
router.post("/login", authController.login);

export default router;



