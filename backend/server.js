import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/email", emailRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2002;

app.listen(PORT);
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
