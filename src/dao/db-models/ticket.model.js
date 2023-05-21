import mongoose from "mongoose";

export const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  tickets: {
    code: {
      type: String,
      unique: true,
    },
    purchase_datetime: {
      type: DateTime,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
});

const DbTicketModel = mongoose.model(ticketCollection, ticketSchema);

export default DbTicketModel;
