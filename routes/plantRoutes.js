const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const plantController = require("../controllers/plantController");

router.post("/", authMiddleware, plantController.addPlant);
router.get("/", authMiddleware, plantController.getPlants);
router.delete("/:id", authMiddleware, plantController.deletePlant);

module.exports = router;