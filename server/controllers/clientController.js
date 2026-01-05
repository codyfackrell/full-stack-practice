import db from "../config/db.config.js";

const getClients = async (req, res) => {
  const therapistId = req.params.therapistId;
  try {
    const [clients] = await db.query(
      "SELECT * FROM clients WHERE therapist_id = ?",
      [therapistId]
    );
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get clients",
    });
  }
};

const addClient = async (req, res) => {
  const therapistId = req.params.therapistId;
  const { first_name, last_name } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO clients (first_name, last_name, therapist_id) VALUES (?, ?, ?)",
      [first_name, last_name, therapistId]
    );

    const newClient = {
      id: result.insertId,
      first_name,
      last_name,
      therapist_id: therapistId,
    };

    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add client",
    });
  }
};

export default { getClients, addClient };
