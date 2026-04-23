import { request } from "../../shared/js/api.js";
import { obtenerUsuario, cerrarSesion } from "../../shared/js/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = obtenerUsuario();

  if (!usuario) {
    window.location.href = "../auth/index.html";
    return;
  }

  document.getElementById("user-name").textContent = usuario.name;
  document.getElementById("welcome-message").textContent =
    `Bienvenido, ${usuario.name} 👋`;

  document.getElementById("logout-btn").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../auth/index.html";
  });

  try {
    const response = await request("/dashboard");
    if (response.ok) {
      const { totalStudents, pendingPayments, absencesToday } =
        response.dashboard;
      animateCount("total-students", totalStudents ?? 0);
      animateCount("pending-payments", pendingPayments ?? 0);
      animateCount("absences-today", absencesToday ?? 0);
    }
  } catch (err) {
    console.error("Error al cargar datos:", err);
  }

  initCharts();
});

/* ── Count-up animation ── */
function animateCount(id, target, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = Date.now();
  function tick() {
    const p = Math.min((Date.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ── Chart defaults ── */
function chartDefaults() {
  Chart.defaults.font.family = "'Nunito', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = "#6b7280";
}

function initCharts() {
  chartDefaults();

  /* Attendance line chart */
  const ctxA = document.getElementById("attendanceChart")?.getContext("2d");
  if (ctxA) {
    const gradient = ctxA.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, "rgba(139,92,246,0.22)");
    gradient.addColorStop(1, "rgba(139,92,246,0)");

    new Chart(ctxA, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        datasets: [
          {
            label: "Asistencia %",
            data: [95, 88, 92, 85, 90, 80],
            borderColor: "#8b5cf6",
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            tension: 0.45,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            min: 70,
            grid: { color: "rgba(139,92,246,0.06)", drawBorder: false },
            ticks: { color: "#9ca3af" },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#9ca3af" },
          },
        },
      },
    });
  }

  /* Payments doughnut chart */
  const ctxP = document.getElementById("paymentsChart")?.getContext("2d");
  if (ctxP) {
    new Chart(ctxP, {
      type: "doughnut",
      data: {
        labels: ["Al día", "Pendiente", "En mora"],
        datasets: [
          {
            data: [65, 25, 10],
            backgroundColor: ["#86efac", "#fdba74", "#fda4af"],
            borderColor: ["#22c55e", "#f59e0b", "#f43f5e"],
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "68%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#6b7280",
              padding: 18,
              usePointStyle: true,
              pointStyleWidth: 10,
            },
          },
        },
      },
    });
  }
}
