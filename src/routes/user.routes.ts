import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/getAllPerPage", auth, isAdmin, userController.getAllPerPage);
router.get("/getAllArtists", userController.getAllArtist);//traemos todos los artistas
router.get("/:id", auth, isAdmin, userController.getById);
router.get("/getArtistUser/:id", userController.getArtistUser);//NOS TRAEMOS EL USER_ID DE NUESTRO ARTISTA
router.get("/getClientUser/:id", userController.getClientUser);//NOS TRAEMOS EL USER_ID DE NUESTRO CLIENTE
router.get("/getClientByUser/:id",  userController.getClientByUser);//NOS TRAEMOS EL CLIENTE Y EL USER, SUS CITAS Y LOS DETALLES DEL TATUADOR, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)
router.get("/getArtistByUser/:id", auth, userController.getArtistByUser);//NOS TRAEMOS EL ARTISTA Y EL USER, LOS DISEÑOS DEL ARTISTA, SUS CITAS Y LOS DETALLES DEL CLIENTE, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)
router.post("/", auth, isAdmin, userController.create);
router.post("/CreateArtist", auth, isAdmin, userController.createArtist);
router.patch("/update/:id", auth, isAdmin, userController.update);
router.delete("/delete/:id", auth, isAdmin, userController.delete);


export default router;
