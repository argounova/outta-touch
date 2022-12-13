const { Schema, model } = require("mongoose");
const messageSchema = require("./Message");

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
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [messageSchema],
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
