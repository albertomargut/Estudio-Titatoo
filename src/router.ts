import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// -----------------------------------------------------------------------------

const router = express.Router();


router.use("/api/users", userRoutes);
router.use("/auth", authRoutes);


export default router;
