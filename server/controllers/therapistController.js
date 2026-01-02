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

export default getTherapists;
