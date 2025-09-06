const express = require('express');
require('dotenv').config();
const connectToDB = require('./config/connectToDb')
const app = express();
const notesController = require("./controllers/notesController")
const userController = require('./controllers/usersController');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const requireAuth = require('./middleware/requireAuth')
const port = process.env.PORT || 3001;


//configure express app 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//connecting to database;
connectToDB();


//Routing API
app.get("/",(req,res)=>{
  res.json({Name : "Rohan"});
})

app.post("/signup",userController.signup);
app.post("/login",userController.login);
app.get("/logout",userController.logout);
app.get("/checkAuth",requireAuth,userController.checkAuth);   

  app.post('/notes',requireAuth,notesController.createNote);

app.get("/notes",requireAuth,notesController.fetchNotes)

app.get("/notes/:id",requireAuth,notesController.fetchNote)

app.put("/notes/:id",requireAuth,notesController.updateNote)

app.delete("/notes/:id",requireAuth,notesController.deleteNote)
//Starting  Server
app.listen(port,()=>{
  console.log(`Listening on port number ${port}`)
})