const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.get("/customer/:customerId", taskController.getTasksByCustomer);
router.post("/", taskController.createTask);
router.put("/:id/stage", taskController.updateTaskStage);
router.put("/:id/complete", taskController.completeTask);

module.exports = router;