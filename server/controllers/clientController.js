import db from "../config/db.config.js";

const getClients = async (req, res) => {
  try {
    const [clients] = await db.query(
      "SELECT * FROM clients WHERE therapist_id = ?",
      [req.params.therapistId]
    );
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get clients",
    });
  }
};

const addClient = async (req, res) => {
  const { first_name, last_name, therapist_id } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO clients (first_name, last_name, therapist_id) VALUES (?, ?, ?)",
      [first_name, last_name, therapist_id]
    );

    const newClient = {
      id: result.insertId,
      first_name,
      last_name,
      therapist_id,
    };

    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add client",
    });
  }
};

export default { getClients, addClient };
