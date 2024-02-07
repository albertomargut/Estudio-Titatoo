import express from "express";
import { AuthController } from "../controllers/AuthController";
// import { AuthArtistController } from "../controllers/AuthArtistController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();


router.post("/register", authController.registerArtist);
router.post("/login", authController.login);

export default router;



