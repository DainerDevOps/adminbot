import express from "express";
import {
  getAcudientes,
  createNewAcudiente,
} from "../controllers/acudienteController.js";

const route = express.Router();

route.get("/acudientes", getAcudientes);
route.post("/acudientes", createNewAcudiente);

export default route;
