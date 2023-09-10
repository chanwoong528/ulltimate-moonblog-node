
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  postType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    require: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  views: { type: Number, required: true, default: 0 },
  create_at: { type: String, required: true },
  update_at: { type: String, required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
module.exports = mongoose.model("Post", postSchema);