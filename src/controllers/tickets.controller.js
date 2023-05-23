import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../services/ticket.service.js";

export const getTicketController = async (req, res) => {
  try {
    const tickets = await getTickets();
    res.json({ status: "success", payload: tickets });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const getTicketByIdController = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.tid);
    res.json({ status: "success", payload: ticket });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const createTicketController = async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    let newTicket = {
      code: req.body.code,
      purchase_datetime: req.body.purchase_datetime,
      amount: req.body.amount,
      purchaser: req.body.purchaser,
    };
    const ticketCreated = createTicket(newTicket);
    res.json({ status: "success", payload: ticketCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const updateTicketController = (req, res) => {
  try {
    const ticketId = req.params.tid;
    const body = req.body;
    const result = updateTicket(ticketId, body);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const deleteTicketController = (req, res) => {
  try {
    const ticketId = req.params.tid;
    const result = deleteTicket(ticketId);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
