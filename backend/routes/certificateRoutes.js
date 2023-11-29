import express from "express";
import {
  CreateCertificate,
  getCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();
router.route("/create").post(CreateCertificate);
router.route("/").get(getCertificate);

export default router;
