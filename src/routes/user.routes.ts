import express from "express";
import { UserController } from "../controllers/UserController";
import { isAdmin } from "../middlewares/isAdmin";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", auth, userController.getMyProfile);
router.patch("/:id", auth, userController.update);
router.get("/artists/list", auth, isAdmin, userController.getAllArtists);
router.post("/artists/create", auth, isAdmin, userController.createArtist);


export default router;