import express from "express"
import pool from "../db.js"
import bcrypt, { hash } from "bcrypt"



const router = express.Router()

function isAuthenticated(req, res, next) {
  if (req.session.user) {
      return next(); 
  }
  res.redirect("/login"); 
}


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


router.get("/login", async (req, res) => {
  
  


    res.render("login.njk", {
        title: "Login Page"
         
    })
    
})

router.post("/login", async (req, res) => {
  const { user, password } = req.body; 

  try {
      
      const [rows] = await pool.promise().query("SELECT * FROM user WHERE name = ?", [user]);

      if (rows.length === 0) {
          return res.status(401).send("Fel användarnamn eller lösenord.");
      }

      const dbUser = rows[0]; 
      const hashedPassword = dbUser.password; 

      
      const match = await bcrypt.compare(password, hashedPassword);

      if (!match) {
          return res.status(401).send("Fel användarnamn eller lösenord.");
      }

      
      req.session.user = { id: dbUser.id, name: dbUser.name };
      res.redirect("/inloggad"); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Serverfel, försök igen senare.");
  }
});

router.get("/inloggad",isAuthenticated, async (req, res) => {
  if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.render("inloggad.njk",
      { title: "Test", message: "Funkar?", views: req.session.views }
    )

})


export default router