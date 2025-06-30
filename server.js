import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth/AuthRoutes.js";
import AssignmentRoutes from "./routes/assignments/AssignmentRoutes.js";
import connectToDB from "./DB/database.js";
import dotenv from "dotenv";
import NotificationRoutes from "./routes/notifications/NotificationRoutes.js";

const app = express();
const PORT = 4050;

dotenv.config();

connectToDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/assignment", AssignmentRoutes);
app.use("/api/v1/notifications", NotificationRoutes);

app.get("/keep-alive", async (req, res) => {
  res.status(200).send({ success: true, message: "Server Is Alive" });
});

app.listen(PORT, () => {
  console.log(`Server Is Running at: http://localhost:${PORT}`);
});
