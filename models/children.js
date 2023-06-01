const mongoose = require("mongoose");

const Childrens = new mongoose.Schema(
  {
    fullname: {
      type: "string",
      required: true,
      trim: true,
    },
    birth: {
      type: "string",
      required: true,
      trim: true,
    },
    date: {
      type: "string",
      required: true,
      trim: true,
    },
    amount: {
      type: "number",
      required: true,
      trim: true,
    },
    groups: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Groups'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Childrens", Childrens);
