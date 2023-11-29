import Certificate from "../models/certificateModel.js";
import asyncHandler from "express-async-handler";

const getCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.find({ cid: req.query.cid });
  if (certificate) {
    res.json(certificate);
  } else {
    res.status(404).json({ message: "Certificate not found" });
  }
});

const CreateCertificate = asyncHandler(async (req, res) => {
  const { cid, driveURL } = req.body;
  if (!cid || !driveURL) {
    res.status(400);
    throw new Error("Please fill all the fields");
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
