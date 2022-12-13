const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        // TODO: make sure every group always has at least one admin
        isAdmin: {
          type: Boolean,
          default: () => false,
        },
      },
    ],
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: () => Date.now(),
        },
        updated: {
          type: Boolean,
          default: () => false,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

groupSchema.virtual("numberOfMembers").get(() => this.members.length);

const Group = model("Group", groupSchema);

module.exports = Group;
