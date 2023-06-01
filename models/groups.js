const mongoose = require("mongoose");

const Groups = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
    },
    descr: {
      type: "string",
      required: true,
      trim: true,
    },
    teacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workers'
      }
    ],
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Childrens'
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Groups", Groups);
