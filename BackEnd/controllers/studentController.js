import { getAll, create } from "../models/studentModel.js";
import { randomUUID } from "crypto";

export const getStudent = async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const createStudent = async (req, res) => {
  try {
    const newStudent = {
      id: randomUUID(),
      ...req.body,
    };

    await create(newStudent);

    res.status(201).json({ message: "Student created" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

