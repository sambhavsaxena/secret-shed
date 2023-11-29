import mongoose from "mongoose";

const certificateSchema = mongoose.Schema(
  {
    cid: {
      type: String,
      required: true,
    },
    driveURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
