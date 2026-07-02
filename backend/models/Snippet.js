const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["JavaScript", "Python", "Java", "C++", "C"],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;