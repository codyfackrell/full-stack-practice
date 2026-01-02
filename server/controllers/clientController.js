import db from "../config/db.config.js";

const getClients = async (req, res) => {
  try {
    const [clients] = await db.query(
      "SELECT * FROM clients WHERE therapist_id = ?",
      [req.params.therapistId]
    );
    res.status(200).json({
      data: clients,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get clients",
    });
  }
};

export default getClients;
