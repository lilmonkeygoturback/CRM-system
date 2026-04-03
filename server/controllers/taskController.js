const db = require("../config/db");

const VALID_STAGES = ["To Do", "In Progress", "Done"];

function getSafeStage(stage) {
  return VALID_STAGES.includes(stage) ? stage : "To Do";
}

// GET all tasks for task board
exports.getAllTasks = (req, res) => {
  const sql = `
    SELECT
      t.id,
      t.customer_id,
      c.full_name AS customer_name,
      c.status AS customer_status,
      t.title,
      t.description,
      t.stage,
      t.due_date,
      t.created_at
    FROM tasks t
    JOIN customers c ON t.customer_id = c.id
    ORDER BY
      CASE
        WHEN t.stage = 'To Do' THEN 1
        WHEN t.stage = 'In Progress' THEN 2
        WHEN t.stage = 'Done' THEN 3
        ELSE 4
      END,
      t.due_date ASC,
      t.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching all tasks:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

// GET tasks by customer
exports.getTasksByCustomer = (req, res) => {
  const { customerId } = req.params;

  const sql = `
    SELECT
      id,
      customer_id,
      title,
      description,
      stage,
      due_date,
      created_at
    FROM tasks
    WHERE customer_id = ?
    ORDER BY due_date ASC, created_at DESC
  `;

  db.query(sql, [customerId], (err, results) => {
    if (err) {
      console.error("Error fetching tasks by customer:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

// POST create task
exports.createTask = (req, res) => {
  const { customer_id, title, description, due_date, stage } = req.body;

  if (!customer_id || !title || !due_date) {
    return res.status(400).json({
      message: "customer_id, title, and due_date are required"
    });
  }

  const safeStage = getSafeStage(stage);

  const sql = `
    INSERT INTO tasks (customer_id, title, description, stage, due_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [customer_id, title, description || "", safeStage, due_date],
    (err, result) => {
      if (err) {
        console.error("Error creating task:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        message: "Task created successfully",
        taskId: result.insertId
      });
    }
  );
};

// PUT update task stage
exports.updateTaskStage = (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;

  if (!VALID_STAGES.includes(stage)) {
    return res.status(400).json({
      message: "Invalid stage value"
    });
  }

  const sql = `
    UPDATE tasks
    SET stage = ?
    WHERE id = ?
  `;

  db.query(sql, [stage, id], (err, result) => {
    if (err) {
      console.error("Error updating task stage:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task stage updated successfully" });
  });
};

// PUT mark task as completed
exports.completeTask = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE tasks
    SET stage = 'Done'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error marking task as completed:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task marked as completed" });
  });
};