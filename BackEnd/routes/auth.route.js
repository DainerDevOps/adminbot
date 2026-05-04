// import { login } from "../controllers/auth.controller"

// import express from "express";

// import { login } from "../controllers/auth.controller.js";
// const router = express.Router();

// router.post("/login", (req, res) => {
//   console.log("Login endpoint funcionando");

//   res.json({
//     message: "Login OK",
//   });
// });

// export default router;

import express from "express";
import { login } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", login);

export default router;
