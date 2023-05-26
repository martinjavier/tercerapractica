import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../services/ticket.service.js";

// GET
// localhost:8080/api/tickets
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
    // CREO EL TICKET
    let ticketCreated = createTicket(req.body);
    res.json({ status: "success", payload: ticketCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const updateTicketController = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const body = req.body;
    const result = await updateTicket(ticketId, body);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const deleteTicketController = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const result = await deleteTicket(ticketId);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
