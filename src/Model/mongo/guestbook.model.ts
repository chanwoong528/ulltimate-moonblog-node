import mongoose from "mongoose";
const { Schema } = mongoose;

const guestbookSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },

  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guestbook",
  },
});

const Guestbook = mongoose.model("Guestbook", guestbookSchema);

export default Guestbook;
