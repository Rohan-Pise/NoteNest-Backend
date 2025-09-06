const Note = require('../models/notes');


const createNote = async (req,res)=>{
  // get the sent  in data from request body
  let title=req.body.title; 
  let body =req.body.body;

  // Create a note with it
 const note = await Note.create({
  title:title,
  body:body,
  user:req.user._id
});

  //respond with the new Note
  res.json({note:note});
}

const fetchNotes = async (req,res)=>{
  //find the notes 
  const notes  = await Note.find({user:req.user._id});
  //respond with notes
  res.json({notes:notes});
}


const fetchNote = async (req,res)=>{
  //Get the id of the url 
   let noteId =req.params.id

  // find the note Using that id
  const note = await Note.findOne({_id:noteId , user:req.user._id});

  // respond with that particular nOte
  res.json({note:note});
}

const updateNote = async (req,res)=>{
  // Get the id of the url 
  const noteId = req.params.id;

  //Get the data from req body
   const title = req.body.title;
   const body = req.body.body;

  // find & update the record
   await Note.findOneAndUpdate({_id:noteId , user: req.user._id},{
    title: title,
    body: body,
  })

  //respond with it for that you have to find updated note
  const note = await Note.findById(noteId);
  res.json({note : note});
}


const deleteNote = async (req,res)=>{
  //get id of URL
  const noteId = req.params.id;

  //Delete the record
  await Note.deleteOne({_id: noteId, user:req.user._id});

  //Respond
  res.json({success:"Record Deleted"});
}

module.exports={
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};