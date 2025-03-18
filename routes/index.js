import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"


const router = express.Router()

router.get("/", async (req, res) => {
    if (req.session.views) {
        req.session.views++
      } else {
        req.session.views = 1
      }
      res.render("index.njk",
        { title: "Test", message: "Funkar?", views: req.session.views }
      )
  
})


router.get("/login", (req, res) => {
    const myPlaintextPassword = "Secret123"

    let hashedPass = ""

    bcrypt.hash( myPlaintextPassword, 10, function(err, hash) {
        console.log(hash)
    })

    res.render("login.njk", {
        title: "Login Page"
         
    })
    
})

router.post("/login", (req, res) => {
    const username = req.body.user
    const password = req.body.password
})

export default router