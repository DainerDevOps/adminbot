import db from "../config/database.js";

export const getDashboardData = async () => {
  const [students] = await db.query(
    "SELECT COUNT(*) AS total FROM students",
  );

  const [pendingPayments] = await db.query(
    `SELECT COUNT(*) AS total
     FROM accounts_receivable
     WHERE status = 'pending'`,
  );

  const [absencesToday] = await db.query(
    `SELECT COUNT(*) AS total
     FROM attendance
     WHERE attendance_date = CURDATE()
     AND status = 'absent'`,
  );

  return {
    totalEstudiantes: students[0].total,
    pagosPendientes: pendingPayments[0].total,
    ausenciasHoy: absencesToday[0].total
  };
};
