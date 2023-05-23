import mongoose from "mongoose";

export const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchase_datetime: { type: Date, required: false },
  amount: { type: Number, required: false },
  purchaser: { type: String, required: false },
});

const DbTicketModel = mongoose.model(ticketCollection, ticketSchema);

export default DbTicketModel;
