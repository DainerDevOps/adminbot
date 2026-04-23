import { request } from "../../shared/js/api.js";
import { guardarUsuario } from "../../shared/js/storage.js";
import {
  validarCorreo,
  mostrarError,
  limpiarError,
} from "../../shared/js/utils.js";

const form = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  limpiarError(errorMessage);

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    return mostrarError(errorMessage, "Datos incompletos");
  }

  if (!validarCorreo(email)) {
    return mostrarError(errorMessage, "Correo inválido");
  }

  try {
    const data = await request("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (data.ok) {
      guardarUsuario(data.user);
      window.location.href = "../dashboard/index.html";
    }
  } catch (error) {
    mostrarError(errorMessage, error.message);
  }
});
