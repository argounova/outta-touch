const { Schema, model } = require("mongoose");
const messageSchema = require("./Message");
const User = require("./User");

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Object,
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

groupSchema.pre("findOneAndDelete", () => {
  this.members.forEach(async (userId) => {
    const userData = await User.findById(userId);
    let index = userData.groups.findIndex(this.id);
    userData.groups.splice(index, 1);
    userData.save();
  });
});

const Group = model("Group", groupSchema);

module.exports = Group;
