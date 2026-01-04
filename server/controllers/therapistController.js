import db from "../config/db.config.js";

const getTherapists = async (req, res) => {
  try {
    const [therapists] = await db.query("SELECT * FROM therapists");
    res.status(200).json(therapists);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get therapists",
    });
  }
};

const deleteTherapist = async (req, res) => {
  try {
    await db.query("DELETE FROM therapists WHERE id = ?", [
      req.params.therapistId,
    ]);
    res.status(200).json({
      message: "Successfully deleted therapist",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete therapist",
    });
  }
};

const addTherapist = async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO therapists (first_name, last_name) VALUES (?, ?)",
      [first_name, last_name]
    );

    const newTherapist = {
      id: result.insertId,
      first_name,
      last_name,
    };
    res.status(201).json(newTherapist);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add therapist",
    });
  }
};

export default { getTherapists, deleteTherapist, addTherapist };
