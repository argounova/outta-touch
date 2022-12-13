const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    updated: {
      type: Boolean,
      default: () => false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

messageSchema.virtual("length").get(() => this.body.length);

module.exports = messageSchema;
