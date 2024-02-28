import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointments.routes";

// -----------------------------------------------------------------------------

const router = express.Router();


router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/appointments/", appointmentRoutes);


export default router;
