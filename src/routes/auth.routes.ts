import express from "express";
import { AuthClientController } from "../controllers/AuthClientController";
import { AuthArtistController } from "../controllers/AuthArtistController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authClientController = new AuthClientController();
const authArtistController = new AuthArtistController();

router.post("/registerArtist", authArtistController.registerArtist);
router.post("/registerClient", authClientController.registerClient);
router.post("/loginClient", authClientController.login);
router.post("/loginArtist", authArtistController.login);

export default router;



