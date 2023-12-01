import Certificate from "../models/certificateModel.js";
import asyncHandler from "express-async-handler";

const getCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({ cid: req.query.cid });
  if (certificate) {
    res.json(certificate);
  } else {
    res.status(404).json({ message: "Certificate not found!" });
  }
});

const CreateCertificate = asyncHandler(async (req, res) => {
  const { cid, driveURL } = req.body;
  if (!cid || !driveURL) {
    res.status(404).json({ message: "Please fill out all the fields!" });
  }
  const exists = await Certificate.findOne({ cid });
  if (exists) {
    res.status(400).json({ message: "Certificate already exists!" });
  } else {
    const certificate = new Certificate({
      cid: cid,
      driveURL: driveURL,
    });
    const createdCertificate = await certificate.save();
    res.status(201).json(createdCertificate);
  }
});

export { CreateCertificate, getCertificate };
