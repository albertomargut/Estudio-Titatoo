import express from "express";
import { AuthController } from "../controllers/AuthClientController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerArtist", authController.registerArtist);
router.post("/registerClient", authController.registerClient);
router.post("/login", authController.login);

export default router;



