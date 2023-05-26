import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  message: {
    type: String,
  },
});

let DbMessageModel = mongoose.model("messages", messageSchema);

export default DbMessageModel;
