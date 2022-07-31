import express from "express"
import {
  getArticleById,
  getArticles,
  CreateArticle,
  DeleteArticle,
  UpdateArticle,
  getAll
} from "../controllers/articleController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.route("/").get(protect, getArticles)
router.route("/all").get(getAll)
router
  .route("/:id")
  .get(getArticleById)
  .delete(protect, DeleteArticle)
  .put(protect, UpdateArticle)
router.route("/create").post(protect, CreateArticle)

export default router
