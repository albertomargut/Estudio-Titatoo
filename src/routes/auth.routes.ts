import express from "express";
import { AuthController } from "../controllers/AuthController";
// import { AuthArtistController } from "../controllers/AuthArtistController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();


router.post("/registerArtist", authController.registerArtist);
router.post("/loginClient", authController.login);

export default router;



