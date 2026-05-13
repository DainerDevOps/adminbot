import express from "express";
import bcrypt from "bcrypt";
import cors from "cors"


import studentRoutes from "./routes/students.route.js";
import acudienteRoutes from "./routes/acudientes.route.js";
import usuarioRoutes from "./routes/usuarios.route.js";
import pagoRoutes from "./routes/pagos.route.js";
import asistenciaRoutes from "./routes/asistencias.route.js";
import notificacionRoutes from "./routes/notificaciones.route.js";
import authRoutes from "./routes/auth.route.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import whatsappRoutes from "./modules/whatsapp/whatsapp.router.js"

const app = express();

app.use(cors());
app.use(express.json()); //

const PORT = 3000

app.use("/api", studentRoutes);
app.use("/api", acudienteRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", pagoRoutes);
app.use("/api", asistenciaRoutes);
app.use("/api", notificacionRoutes);
app.use("/api", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/whatsapp", whatsappRoutes)

app.get("/", (req, res)=>{
    res.send("Api funcionando")
})

// const passwordlist = [
//   "joel123",
//   "juan123",
//   "andres123",
//   "alejandro123",
//   "guillermo123"

// ]

// for(let i = 0; i < passwordlist.length; i++){
//   const hash = await bcrypt.hash(passwordlist[i], 10)
//   console.log(`contraseña :  ${passwordlist[i]}, hash: ${hash}` )
  
// }

app.listen(3000, () => {
  console.log("Server running on port 3000");
});