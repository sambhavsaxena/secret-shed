import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import path from "path"
import noteRoutes from "./routes/noteRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
//Initialize app
dotenv.config()
connectDB()
const app = express()
//Defining routes
app.use(express.json())
app.use("/api/notes", noteRoutes)
app.use("/api/users", userRoutes)

//Deployment paths
const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")))
}
else {
  app.get("/", (req, res) => { res.send("API is running") })
}

// Error handlers
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 2002

app.listen(PORT)
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
