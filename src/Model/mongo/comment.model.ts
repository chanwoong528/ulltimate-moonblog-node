import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  childrenCount: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
