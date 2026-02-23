const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  wateringFrequency: {
    type: String
  },
  sunlight: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Plant", plantSchema);