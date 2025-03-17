import express from "express";
import {
  createProducer,
  health,
} from "../controllers/emailController.js";

const router = express.Router();
router.route("/create").post(createProducer);
router.route("/").get(health);

export default router;
