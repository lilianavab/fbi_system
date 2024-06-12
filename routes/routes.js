import express from "express";
const router = express.Router();
import { home, login, verificarAgente } from "../controller/agenciaController.js";

router.get("/", home);
router.post("/SignIn", login);
router.get("/dashboard", verificarAgente);

export default router;
