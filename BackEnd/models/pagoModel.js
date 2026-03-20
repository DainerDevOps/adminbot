import database from "../config/database.js";

export const getAllPagos = async () => {
  const [rows] = await database.query("SELECT * FROM pagos");
  return rows;
};

export const createPago = async (pago) => {
  const { id, cuenta_por_cobrar_id, valor_pagado, metodo_pago } = pago;

  await database.query(
    "INSERT INTO pagos (id, cuenta_por_cobrar_id, valor_pagado, metodo_pago) VALUES (?, ?, ?, ?)",
    [id, cuenta_por_cobrar_id, valor_pagado, metodo_pago],
  );
};
