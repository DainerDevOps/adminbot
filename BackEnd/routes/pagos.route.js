import express from "express";
import { getPagos, createNewPago } from "../controllers/pagoController.js";

const route = express.Router();

route.get("/pagos", getPagos);
route.post("/pagos", createNewPago);

export default route;
