const mongoose = require("mongoose");

const ChildrenOrders = new mongoose.Schema(
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
    phone: {
      type: "string",
      required: true,
      trim: true,
    },
    adress: {
      type: "string",
      required: true,
      trim: true,
    },
    descr: {
      type: "string",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChildrenOrders", ChildrenOrders);
