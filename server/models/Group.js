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
        type: Schema.Types.ObjectId,
        ref: "User",
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
