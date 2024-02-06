import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";
import { isClient } from "../middlewares/isClient";
// -----------------------------------------------------------------------------

const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/Appointments", auth, isClient, isArtist, appointmentController.getAll)
router.get("/clientsAppointments/:id", auth, isClient, appointmentController.getById)
router.get("/artistsAppontments/:id", auth, isArtist, appointmentController.getByArtist)
router.post("/NewAppointment", auth, isClient, isArtist, appointmentController.create)
router.patch("/UpdateAppointment/:id", auth, isClient, isArtist, appointmentController.update);
router.delete("/DeleteAppointment/:id", auth, isClient, isArtist, appointmentController.delete);



export default router;

