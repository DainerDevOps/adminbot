import database from "../config/database.js";

export const getAllPagos = async () => {
  const [rows] = await database.query("SELECT * FROM payments");
  return rows;
};

export const createPago = async (pago) => {
  const { id, account_receivable_id, amount_paid, payment_method } = pago;

  await database.query(
    "INSERT INTO payments (id, account_receivable_id, amount_paid, payment_method) VALUES (?, ?, ?, ?)",
    [id, account_receivable_id, amount_paid, payment_method],
  );
};
