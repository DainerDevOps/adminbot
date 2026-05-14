// ============================================================================
// students.js — Módulo de Gestión de Estudiantes
// Toastify se carga como global vía CDN en index.html (no import)
// ============================================================================

import { request } from "../../shared/js/api.js";

let allStudents = [];
let filteredStudents = [];

// ============================================================================
// Initialize on DOM Load
// ============================================================================
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Inicializando módulo de estudiantes...");
  initializeEventListeners();
  await loadStudents();
  console.log("✅ Módulo de estudiantes inicializado");
});

// ============================================================================
// Initialize Event Listeners
// ============================================================================
function initializeEventListeners() {
  // Modal: abrir
  document
    .getElementById("btnNewStudent")
    ?.addEventListener("click", openModal);

  // Modal: cerrar con botón X
  document.getElementById("closeModal")?.addEventListener("click", closeModal);

  // Modal: cerrar con botón Cancelar
  document.getElementById("btnCancel")?.addEventListener("click", closeModal);

  // Modal: cerrar al hacer clic fuera del contenido
  document.getElementById("modalNewStudent")?.addEventListener("click", (e) => {
    if (e.target.id === "modalNewStudent") closeModal();
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Búsqueda en tiempo real
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    filterStudents(e.target.value);
  });

  // Envío del formulario
  document
    .getElementById("formNewStudent")
    ?.addEventListener("submit", handleFormSubmit);

  // ================================
  // WhatsApp Modal
  // ================================

  document
    .getElementById("closeWhatsappModal")
    ?.addEventListener("click", closeWhatsappModal);

  document
    .getElementById("btnCancelWhatsapp")
    ?.addEventListener("click", closeWhatsappModal);

  document
    .getElementById("btnSendWhatsapp")
    ?.addEventListener("click", handleSendWhatsapp);

  document.getElementById("whatsappModal")?.addEventListener("click", (e) => {
    if (e.target.id === "whatsappModal") {
      closeWhatsappModal();
    }
  });
}

// ============================================================================
// Load Students from API
// ============================================================================
async function loadStudents() {
  const tbody = document.getElementById("studentsBody");

  // Mostrar estado de carga
  tbody.innerHTML = `
    <tr class="loading-row">
      <td colspan="7" class="loading-text">Cargando estudiantes...</td>
    </tr>
  `;

  try {
    const response = await request("/student");
    allStudents = Array.isArray(response) ? response : (response?.data ?? []);
    filteredStudents = [...allStudents];

    console.log(`📊 Estudiantes cargados: ${allStudents.length}`);
    renderStudents(filteredStudents);
    updateStudentCount();
  } catch (error) {
    console.error("❌ Error al cargar estudiantes:", error);
    showToast("Error al cargar los estudiantes", "error");
    renderError();
  }
}

// ============================================================================
// Render Students in Table
// ============================================================================
function renderStudents(students) {
  const tbody = document.getElementById("studentsBody");
  const emptyState = document.getElementById("emptyState");

  tbody.innerHTML = "";

  if (students.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  students.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(student.student_code)}</td>
      <td>${escapeHtml(student.first_name)} ${escapeHtml(student.last_name)}</td>
      <td>${escapeHtml(student.grade)}</td>
      <td>${escapeHtml(student.document_type)} ${escapeHtml(student.document_number)}</td>
      <td>${escapeHtml(student.school_year)}</td>
      <td>
        <span class="status-badge status-${student.status || "active"}">
          ${formatStatus(student.status)}
        </span>
      </td>
     <td>
  <div class="action-buttons">
    <button 
      class="btn-action"
      title="Ver detalles"
      data-id="${student.id || student.student_code}"
    >
      👁️
    </button>

    <button 
      class="btn-action"
      title="Editar"
      data-id="${student.id || student.student_code}"
    >
      ✏️
    </button>

    <button 
      class="btn-action btn-whatsapp"
      title="Enviar WhatsApp"
      onclick="openWhatsappModal(
      '${student.phone || ""}',
      '${student.first_name}'
      )"
    >
      💬
    </button>
  </div>
</td>
    `;
    tbody.appendChild(tr);
  });
}

// ============================================================================
// Filter Students
// ============================================================================
function filterStudents(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  const searchInfo = document.getElementById("searchInfo");

  if (term === "") {
    filteredStudents = [...allStudents];
    searchInfo.textContent = "";
  } else {
    filteredStudents = allStudents.filter((student) => {
      const code = (student.student_code || "").toLowerCase();
      const fullName =
        `${student.first_name || ""} ${student.last_name || ""}`.toLowerCase();
      return code.includes(term) || fullName.includes(term);
    });

    searchInfo.textContent = `${filteredStudents.length} resultado(s) encontrado(s)`;
  }

  renderStudents(filteredStudents);
  updateStudentCount();
}

// ============================================================================
// Update Student Count
// ============================================================================
function updateStudentCount() {
  const countEl = document.getElementById("studentCount");
  if (countEl) countEl.textContent = `Total: ${filteredStudents.length}`;
}

// ============================================================================
// Modal Management
// ============================================================================
function openModal() {
  const modal = document.getElementById("modalNewStudent");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Enfocar el primer campo del form
    setTimeout(() => {
      document.getElementById("studentCode")?.focus();
    }, 100);
  }
}

function closeModal() {
  const modal = document.getElementById("modalNewStudent");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  document.getElementById("formNewStudent")?.reset();
}

// ============================================================================
// Handle Form Submission
// ============================================================================
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");

  // Deshabilitar botón mientras se procesa
  submitBtn.disabled = true;
  submitBtn.textContent = "Registrando...";

  try {
    const formData = new FormData(form);

    // Timestamp en formato MySQL: YYYY-MM-DD HH:MM:SS
    const now = new Date();
    const mysqlDatetime = now.toISOString().slice(0, 19).replace("T", " ");

    const studentData = {
      student_code: formData.get("student_code")?.trim(),
      first_name: formData.get("first_name")?.trim(),
      last_name: formData.get("last_name")?.trim(),
      document_type: formData.get("document_type"),
      document_number: formData.get("document_number")?.trim(),
      birth_date: formData.get("birth_date"),
      grade: formData.get("grade")?.trim(),
      phone: formData.get("phone")?.trim(),
      school_year: formData.get("school_year")?.trim(),
      status: formData.get("status"),
      created_at: mysqlDatetime,
      updated_at: mysqlDatetime,
    };

    console.log("📊 Datos del nuevo estudiante:", studentData);

    // Validar campos requeridos
    if (!validateStudentData(studentData)) {
      showToast("Por favor completa todos los campos requeridos", "error");
      return;
    }

    // POST al API
    const response = await request("/student", {
      method: "POST",
      body: JSON.stringify(studentData),
    });

    console.log("✅ Estudiante creado:", response);
    showToast("¡Estudiante registrado exitosamente!", "success");
    closeModal();
    await loadStudents(); // Recargar tabla
  } catch (error) {
    console.error("❌ Error al crear estudiante:", error);
    showToast(
      `Error: ${error.message || "No se pudo registrar el estudiante"}`,
      "error",
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Registrar Estudiante";
  }
}

// ============================================================================
// Validation
// ============================================================================
function validateStudentData(data) {
  const required = [
    "student_code",
    "first_name",
    "last_name",
    "document_type",
    "document_number",
    "birth_date",
    "grade",
    "phone",
    "school_year",
    "status",
  ];
  return required.every((field) => data[field] && data[field].trim() !== "");
}

// ============================================================================
// Utility Functions
// ============================================================================
function formatStatus(status) {
  return (
    { active: "Activo", inactive: "Inactivo", suspended: "Suspendido" }[
      status
    ] || "Desconocido"
  );
}

function escapeHtml(text) {
  if (text === null || text === undefined || text === "") return "—";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

// ============================================================================
// Toast Notifications — usa Toastify global (cargado por CDN en index.html)
// ============================================================================
function showToast(message, type = "info") {
  const colors = {
    success: "linear-gradient(to right, #00b09b, #96c93d)",
    error: "linear-gradient(to right, #ff5f6d, #ffc371)",
    info: "linear-gradient(to right, #2196f3, #21cbf3)",
    warning: "linear-gradient(to right, #f7971e, #ffd200)",
  };

  // Toastify está disponible como global vía CDN
  if (typeof Toastify === "undefined") {
    console.warn("Toastify no disponible, usando alert como fallback");
    alert(message);
    return;
  }

  Toastify({
    text: message,
    duration: 3500,
    gravity: "top",
    position: "right",
    style: { background: colors[type] || colors.info },
    stopOnFocus: true,
  }).showToast();
}

// ============================================================================
// Error Rendering
// ============================================================================
function renderError() {
  const tbody = document.getElementById("studentsBody");
  tbody.innerHTML = `
    <tr>
      <td colspan="7" style="text-align:center; padding:40px; color:var(--danger-color);">
        ⚠️ Error al cargar los estudiantes. Por favor, intenta de nuevo.
      </td>
    </tr>
  `;
  document.getElementById("emptyState").style.display = "none";
}

// ============================================================================
// SEND WHATSAPP MESSAGE
// ============================================================================

async function sendWhatsapp(phone, studentName) {
  try {
    const message = `Hola ${studentName}, este es un mensaje enviado desde AdminBot 🚀`;

    const response = await fetch("http://localhost:3000/api/whatsapp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        message,
      }),
    });

    const data = await response.json();

    console.log("📩 Respuesta WhatsApp:", data);

    if (data.ok) {
      showToast("Mensaje enviado correctamente", "success");
    } else {
      showToast("No se pudo enviar el mensaje", "error");
    }
  } catch (error) {
    console.error("❌ Error WhatsApp:", error);
    showToast("Error del servidor", "error");
  }
}

// Hacer disponible globalmente
window.sendWhatsapp = sendWhatsapp;

// ============================================================================
// OPEN WHATSAPP MODAL
// ============================================================================

function openWhatsappModal(phone, studentName) {
  // Abrir modal
  const modal = document.getElementById("whatsappModal");

  modal.classList.add("active");

  // Llenar datos
  document.getElementById("whatsappStudentName").value = studentName;

  document.getElementById("whatsappPhone").value = phone;

  // Mensaje por defecto
  document.getElementById("whatsappMessage").value =
    `Hola ${studentName}, este es un mensaje enviado desde AdminBot 🚀`;
}

// Hacer disponible globalmente
window.openWhatsappModal = openWhatsappModal;

// ============================================================================
// CLOSE WHATSAPP MODAL
// ============================================================================

function closeWhatsappModal() {
  const modal = document.getElementById("whatsappModal");

  modal.classList.remove("active");
}

// ============================================================================
// HANDLE SEND WHATSAPP
// ============================================================================

async function handleSendWhatsapp() {
  try {
    const phone = document.getElementById("whatsappPhone").value;

    const studentName = document.getElementById("whatsappStudentName").value;

    const message = document.getElementById("whatsappMessage").value;

    // Validación
    if (!phone || !message) {
      showToast("Completa los datos del mensaje", "warning");

      return;
    }

    // Request backend
    const response = await fetch("http://localhost:3000/api/whatsapp/send", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        phone,
        message,
      }),
    });

    const data = await response.json();

    console.log("📩 Respuesta WhatsApp:", data);

    if (data.ok) {
      showToast(`Mensaje enviado a ${studentName}`, "success");

      closeWhatsappModal();
    } else {
      showToast(data.error || "No se pudo enviar", "error");
    }
  } catch (error) {
    console.error("❌ Error WhatsApp:", error);

    showToast("Error del servidor", "error");
  }
}
