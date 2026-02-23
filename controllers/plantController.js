const Plant = require("../models/Plant");

// Add Plant
exports.addPlant = async (req, res) => {
  try {
    const plant = new Plant({
      user: req.user.userId,
      ...req.body
    });

    await plant.save();
    res.json({ success: true, plant });
  } catch (error) {
    res.status(500).json({ message: "Failed to add plant" });
  }
};

// Get User Plants
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.userId });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch plants" });
  }
};

// Delete Plant
exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: "Plant deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete plant" });
  }
};