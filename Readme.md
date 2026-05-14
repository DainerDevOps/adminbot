
# 🤖 ¿Qué es AdminBot?

**AdminBot** es un sistema administrativo inteligente diseñado para instituciones educativas. Su objetivo es centralizar y automatizar la gestión de estudiantes, asistencia y pagos, facilitando el control administrativo y mejorando la comunicación con padres o acudientes mediante notificaciones automáticas por WhatsApp.

---

## 🎯 ¿Qué problema soluciona?

Muchas instituciones educativas gestionan la asistencia y los pagos de forma manual o con herramientas poco integradas, lo que genera errores, pérdida de información y retrasos en la comunicación con los padres.

**AdminBot** soluciona este problema al automatizar procesos clave, reducir la carga administrativa y garantizar que la información esté disponible en tiempo real, de forma clara y organizada.

---

## 🔄 Flujo del sistema

1. El administrador registra a los estudiantes en el sistema.
2. Se registra diariamente la asistencia.
3. El sistema almacena la información en la base de datos.
4. Se valida el estado de los pagos.
5. El sistema detecta automáticamente:
   - ❌ Faltas de asistencia
   - ⚠️ Pagos pendientes o en mora
6. Se generan notificaciones automáticas por WhatsApp a los acudientes.
7. El administrador puede visualizar todo desde el panel de control (dashboard).

---

## ⚙️ Funcionalidades del sistema

- 👨‍🎓 Registro y gestión de estudiantes (CRUD completo)
- 📅 Control de asistencia diaria
- 💰 Gestión y seguimiento de pagos
- ⚠️ Detección automática de inasistencias
- ⏰ Identificación de pagos pendientes o en mora
- 📲 Envío automático de notificaciones por WhatsApp
- 📊 Panel administrativo con vista centralizada de datos
- 🔐 Autenticación de usuarios

---

## 📲 Integración con WhatsApp

El sistema incluye un módulo de notificaciones automáticas por WhatsApp que permite mantener comunicación directa con los acudientes.

### ✨ Ejemplos de notificación:

- “Su hijo no asistió a clases hoy”
- “Tiene un pago pendiente por realizar”
- “Se ha registrado la asistencia del estudiante”

---

## 🧠 Arquitectura del sistema

AdminBot está construido bajo el patrón **MVC (Model - View - Controller)**:

- **Models:** manejo de datos (MySQL)
- **Controllers:** lógica del sistema
- **Routes:** endpoints de la API REST
- **Services:** integración con WhatsApp API
- **Frontend:** interfaz en JavaScript modular

---

## ⚡ Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- JavaScript (ES6+)
- HTML5 / CSS3
- Vite
- bcrypt
- dotenv

---

## 🧪 Estado del sistema

AdminBot se considera completamente funcional cuando:

- ✔ Se pueden registrar estudiantes correctamente
- ✔ Se registra asistencia sin errores
- ✔ Se gestionan pagos correctamente
- ✔ Se detectan inasistencias y mora automáticamente
- ✔ Se envían notificaciones por WhatsApp de forma estable
- ✔ La información se consulta en tiempo real desde la base de datos

---

## 🚀 Objetivo final

Transformar la gestión educativa tradicional en un sistema digital automatizado, reduciendo errores humanos y mejorando la comunicación entre institución, estudiantes y acudientes.

---

## 👨‍💻 Autor

**DainerDev**

---