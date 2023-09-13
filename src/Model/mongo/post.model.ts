import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  categoryId: { type: String, required: true },

  titleEng: { type: String, required: true },
  contentEng: { type: String, required: true },
  titleKor: { type: String, required: false },
  contentKor: { type: String, required: false },

  views: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },

  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Post", postSchema);

const Post = mongoose.model("Post", postSchema);

export default Post;
