const mongoose = require("mongoose");

const Admins = new mongoose.Schema(
  {
    fullname: {
      type: "string",
      trim: true,
    },
    username: {
      type: "string",
      trim: true,
      required: true
    },
    phone: {
      type: "string",
      trim: true,
    },
    password: {
      type: "string",
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admins", Admins);
