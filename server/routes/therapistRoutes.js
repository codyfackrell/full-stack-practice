import express from "express";
import getTherapists from "../controllers/therapistController.js";

const router = express.Router();

router.get("/", getTherapists);

export default router;
