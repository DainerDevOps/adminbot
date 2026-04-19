import { request } from "../../shared/js/api.js";
import {
  validarCorreo,
  limpiarError,
  mostrarError,
} from "../../shared/js/utils.js";
import { guardarUsuario } from "../../shared/js/storage.js";

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error"); // ← esta también faltaba

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  limpiarError();

  const correo = email.value.trim();
  const clave = password.value.trim();

  if (!validarCorreo(correo)) {
    mostrarError(error, "correo invalido ");
    return;
  }

  if (clave.length < 6) {
    
    mostrarError(error, "la contraseña debe tener minimo 6 caracteres");
    return; 
  }

  try {
    await request("/login", { method: "POST" }); // ← ESTA es la línea clave
  } catch (error) {
    mostrarError(error, "Error en login");
  }
});
