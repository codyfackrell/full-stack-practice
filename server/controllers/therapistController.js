import db from "../config/db.config.js";

const getTherapists = async (req, res) => {
  try {
    const [therapists] = await db.query("SELECT * FROM therapists");
    res.status(200).json({
      success: true,
      data: therapists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get therapists",
    });
  }
};

export default getTherapists;
