import db from "../config/database.js";

export const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM students");
  return rows;
};

export const create = async (data) => {
  console.log("📝 Creando estudiante con datos:", data);

  const {
    id,
    student_code,
    first_name,
    last_name,
    document_type,
    document_number,
    birth_date,
    grade,
    school_year,
    status,
    created_at,
    updated_at,
  } = data;

  try {
    const [result] = await db.query(
      `INSERT INTO students (id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year, status, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        student_code,
        first_name,
        last_name,
        document_type,
        document_number,
        birth_date,
        grade,
        school_year,
        status,
        created_at,
        updated_at,
      ],
    );
    console.log("✅ Estudiante creado exitosamente:", result);
    return result;
  } catch (error) {
    console.error("❌ Error en query INSERT:", error.message);
    console.error("❌ Código de error:", error.code);
    console.error("❌ SQL State:", error.sqlState);
    throw error;
  }
};
