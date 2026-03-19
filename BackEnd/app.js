import express from "express";
import studentRoutes from "./routes/students.route.js";
import acudienteRoutes from "./routes/acudientes.route.js";

const app = express();

app.use(express.json());

app.use("/api", studentRoutes);
app.use("/api", acudienteRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
