import Article from "../models/articleModel.js"
import asyncHandler from "express-async-handler"

const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ user: req.user._id })
  res.json(articles)
})

const getAll = asyncHandler(async (req, res) => {
  var date = new Date().getDate();
  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  var halfyearly = new Date(year, month - 6, date);
  const finaldump = await Article.find({ createdAt: { $gt: halfyearly } }).limit(50).sort({ createdAt: -1 });
  res.json(finaldump)
})

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (article) {
    res.json(article)
  } else {
    res.status(404).json({ message: "Article not found" })
  }
  res.json(article)
})

const CreateArticle = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields")
  } else {
    const article = new Article({ user: req.user._id, title, content, category })
    const createdArticle = await article.save()
    res.status(201).json(createdArticle)
  }
})

const DeleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (article.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }
  if (article) {
    await article.remove()
    res.json({ message: "Article removed" })
  } else {
    res.status(404)
    throw new Error("Article not found")
  }
})

const UpdateArticle = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body
  const article = await Article.findById(req.params.id)
  if (article.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (article) {
    article.title = title
    article.content = content
    article.category = category
    const updatedArticle = await article.save()
    res.json(updatedArticle)
  } else {
    res.status(404)
    throw new Error("Article not found")
  }
})

export { getArticleById, getArticles, CreateArticle, DeleteArticle, UpdateArticle, getAll }
