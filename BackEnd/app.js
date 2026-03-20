import express from "express";

import studentRoutes from "./routes/students.route.js";
import acudienteRoutes from "./routes/acudientes.route.js";
import usuarioRoutes from "./routes/usuarios.route.js";
import pagoRoutes from "./routes/pagos.route.js";
import asistenciaRoutes from "./routes/asistencias.route.js";
import notificacionRoutes from "./routes/notificaciones.route.js";

const app = express();

app.use(express.json());

app.use("/api", studentRoutes);
app.use("/api", acudienteRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", pagoRoutes);
app.use("/api", asistenciaRoutes);
app.use("/api", notificacionRoutes);

app.get("/", (req, res)=>{
    res.send("Api funcionando")
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});