import dotenv from "dotenv"
import users from "./data/users.js"
import articles from "./data/articles.js"
import User from "./models/userModel.js"
import Article from "./models/articleModel.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()
const importData = async () => {
  try {
    await Article.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleArticles = articles.map((article) => {
      return { ...article, user: adminUser }
    })

    await Article.insertMany(sampleArticles)
    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Article.deleteMany()
    await User.deleteMany()
    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
