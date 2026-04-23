import bcrypt from "bcrypt";
import database from "./config/database.js"; // ajusta la ruta si cambia

const passwordlist = [
  "joel123",
  "juan123",
  "andres123",
  "alejandro123",
  "guillermo123",
];

const users = [
  { first_name: "Joel", last_name: "Perez", email: "joel@test.com" },
  { first_name: "Juan", last_name: "Gomez", email: "juan@test.com" },
  { first_name: "Andres", last_name: "Lopez", email: "andres@test.com" },
  { first_name: "Alejandro", last_name: "Diaz", email: "alejandro@test.com" },
  { first_name: "Guillermo", last_name: "Torres", email: "guillermo@test.com" },
];

const seed = async () => {
  try {
    for (let i = 0; i < users.length; i++) {
      const hash = await bcrypt.hash(passwordlist[i], 10);

      await db.query(
        `INSERT INTO users (id, first_name, last_name, email, password_hash)
         VALUES (UUID(), ?, ?, ?, ?)`,
        [users[i].first_name, users[i].last_name, users[i].email, hash],
      );

      console.log(`✅ Usuario creado: ${users[i].email}`);
    }

    console.log("🚀 Todos los usuarios creados");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

seed();
