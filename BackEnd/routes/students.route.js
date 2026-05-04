import express from "express";
import {
  getStudent,
  createStudent,
} from "../controllers/studentController.js";

const route = express.Router();

route.get("/student", getStudent);
route.post("/student", createStudent);

export default route;
