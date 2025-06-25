const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

//Defining the schema of the collection

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: {type: Boolean, default: false}
  },
  {
    timestamps: true, //auto creates the createdAt and updatedAt field
  }
);

const Todo = new Schema(
  {
    userId: { type: Types.ObjectId, index: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    deadline: {
      // Default value is null, if user want they can provide the deadline
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

Todo.index({ userId: 1, completed: 1 });

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel,
  TodoModel,
};
