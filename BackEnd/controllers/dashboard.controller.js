import { getDashboardData } from "../models/dashboard.model.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardData();

    return res.status(200).json({
      ok: true,
      dashboard: data,
    });
  } catch (err) {
    res.status(500).json({
      messagae: "Error en el ",
      error: err.message
    });
  }
};
