import "dotenv/config"
import express from "express"
import session from "express-session";
import logger from "morgan";
import nunjucks from "nunjucks";
import indexRouter from "./routes/index.js"



const app = express()
const port = 3000

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.use(express.static("public"))

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}))


app.use("/", indexRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})