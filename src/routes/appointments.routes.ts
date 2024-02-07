import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";
import { isClient } from "../middlewares/isClient";
// -----------------------------------------------------------------------------

const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/Appointments", auth, appointmentController.getAll)
router.get("/clientsAppointments/:id", auth, isClient, appointmentController.getById)
router.get("/artistsAppontments/:id", auth, isArtist, appointmentController.getByArtist)
router.post("/NewAppointment", auth, isClient, appointmentController.create)
router.patch("/UpdateAppointment/:id", auth, isClient, appointmentController.update);
router.delete("/DeleteAppointment/:id", auth, isClient, appointmentController.delete);



export default router;

