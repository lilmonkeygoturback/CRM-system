const express = require("express");
const router = express.Router();
const {
  getAllInteractions,
  getInteractionsByCustomerId,
  createInteraction
} = require("../controllers/interactionController");

router.get("/", getAllInteractions);
router.get("/customer/:customerId", getInteractionsByCustomerId);
router.post("/", createInteraction);

module.exports = router;