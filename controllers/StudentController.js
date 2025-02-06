const db = require("../config/db");

// Get all students
const getStudents = async (req, res) => {
  try {
    const [students] = await db.query("SELECT * FROM students");
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching students", error });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [student] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (student.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching student", error });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, roll_no, class: studentClass, fees, medium } = req.body;

    if (!name || !roll_no || !studentClass || !fees || !medium) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    await db.query(
      "INSERT INTO students (name, roll_no, class, fees, medium) VALUES (?, ?, ?, ?, ?)",
      [name, roll_no, studentClass, fees, medium]
    );

    res.status(201).json({ success: true, message: "Student created successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ success: false, message: "Roll number must be unique" });
    } else {
      res.status(500).json({ success: false, message: "Error creating student", error });
    }
  }
};


// Update a student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roll_no, class: studentClass, fees, medium } = req.body;

    const [student] = await db.query("SELECT * FROM students WHERE id=?", [id]);
    if (student.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    await db.query(
      "UPDATE students SET name=?, roll_no=?, class=?, fees=?, medium=? WHERE id=?",
      [name, roll_no, studentClass, fees, medium, id]
    );

    res.status(200).json({ success: true, message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating student", error });
  }
};


// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const [student] = await db.query("SELECT * FROM students WHERE id=?", [id]);
    if (student.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    await db.query("DELETE FROM students WHERE id=?", [id]);

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting student", error });
  }
};


module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
