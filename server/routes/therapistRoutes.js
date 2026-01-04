import express from "express";
import therapistController from "../controllers/therapistController.js";

const { getTherapists, deleteTherapist, addTherapist } = therapistController;

const router = express.Router();

router.get("/", getTherapists);
router.delete("/:therapistId", deleteTherapist);
router.post("/", addTherapist);

export default router;
