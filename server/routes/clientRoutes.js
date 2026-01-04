import express from "express";
import ClientControllers from "../controllers/clientController.js";

const { getClients, addClient } = ClientControllers;

const router = express.Router();

router.get("/:therapistId", getClients);
router.post("/", addClient);

export default router;
