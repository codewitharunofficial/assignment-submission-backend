import express from "express";
import { fetchNotifications } from "../../controllers/notifications/notification.js";

const router = express.Router();

router.get("/fetch", fetchNotifications);

export default router;
