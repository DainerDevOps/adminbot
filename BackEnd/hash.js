import bcrypt from "bcrypt";

const password = "$2b$10$u0F8R3H7gTb9MPVlwPZuTugdgJVFeeCvRkMwENLz7/KpYIynpxp1u"; // ← tu contraseña real

bcrypt.hash(password, 10).then(hash => {
  console.log("Hash generado:");
  console.log(hash);
});