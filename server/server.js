import express from "express";
import cors from "cors";
import therapistRoutes from "./routes/therapistRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/therapists", therapistRoutes);
app.use("/clients", clientRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
