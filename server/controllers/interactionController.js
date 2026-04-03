const db = require("../config/db");

// GET all interactions
const getAllInteractions = (req, res) => {
  const sql = "SELECT * FROM interactions";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
};

// GET interactions by customer_id
const getInteractionsByCustomerId = (req, res) => {
  const { customerId } = req.params;
  const sql = "SELECT * FROM interactions WHERE customer_id = ?";

  db.query(sql, [customerId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
};

// POST new interaction
const createInteraction = (req, res) => {
  const { customer_id, type, content, interaction_date, created_by } = req.body;

  if (!customer_id || !type || !content) {
    return res.status(400).json({
      message: "customer_id, type and content are required"
    });
  }

  const sql = `
    INSERT INTO interactions (customer_id, type, content, interaction_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_id,
      type,
      content,
      interaction_date || new Date(),
      created_by || 1
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Interaction created successfully",
        interactionId: result.insertId
      });
    }
  );
};

module.exports = {
  getAllInteractions,
  getInteractionsByCustomerId,
  createInteraction
};