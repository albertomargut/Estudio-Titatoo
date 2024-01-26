import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { isArtist } from "../middlewares/isArtist";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.get("/myjobs/:id", auth, authController.getById)
router.get("/myappointments/:id",auth, isArtist, authController.getByArtist)
router.patch("/:id", auth, authController.updateAppointment);
router.delete("/:id", auth, isArtist, authController.deleteAppointment);

export default router;