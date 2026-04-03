const db = require("../config/db");

const getDashboardSummary = (req, res) => {
  const summary = {};

  const totalCustomersSql = "SELECT COUNT(*) AS totalCustomers FROM customers";
  const totalInteractionsSql = "SELECT COUNT(*) AS totalInteractions FROM interactions";
  const totalTasksSql = "SELECT COUNT(*) AS totalTasks FROM tasks";
  const totalNewCustomersSql =
    "SELECT COUNT(*) AS totalNewCustomers FROM customers WHERE status = 'New'";

  db.query(totalCustomersSql, (err, customerResult) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err.message
      });
    }

    summary.totalCustomers = customerResult[0].totalCustomers;

    db.query(totalInteractionsSql, (err, interactionResult) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message
        });
      }

      summary.totalInteractions = interactionResult[0].totalInteractions;

      db.query(totalTasksSql, (err, taskResult) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message
          });
        }

        summary.totalTasks = taskResult[0].totalTasks;

        db.query(totalNewCustomersSql, (err, newCustomerResult) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
              error: err.message
            });
          }

          summary.totalNewCustomers = newCustomerResult[0].totalNewCustomers;

          res.status(200).json(summary);
        });
      });
    });
  });
};

module.exports = { getDashboardSummary };