import { request } from "../../shared/js/api.js";
import { guardarUsuario } from "../../shared/js/storage.js";
import {
  validarCorreo,
  mostrarError,
  limpiarError,
} from "../../shared/js/utils.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
      Toastify({
        text: "Login exitoso!",
        duration: 4000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "rigth", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      guardarUsuario(data.user);

      setTimeout(() => {
        window.location.href = "../dashboard/index.html";
      }, 2000);
    }
  } catch (error) {
    mostrarError(errorMessage, error.message);
  }
});
