const express = require("express");
const routers = express.Router();
const notes = require("../models/notesmodel");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middware/fetch");

// router 1: get all notes of  user
routers.get("/allnotes", fetchuser, async (req, res) => {
  try {
    const getnote = await notes.find({ user: req.user.id });
    res.json(getnote);
  } catch (e) {
    res.status(500).send("internam server error");
  }
});

// router2 : add notes
routers.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "title must minimum 3 letter").isLength({ min: 3 }),
    body("description", "description must minimum 5 letter").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notesS = new notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const notesave = await notesS.save();
      res.send(notesave);
      console.log(notesave);
    } catch (e) {
      res.send(e);
    }
  }
);

// router 3:  update notes
routers.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // let Notes = await notes.findById(req.params.id);
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let Notes = await notes.findById(req.params.id);
    if (!Notes) {
      return "Not found";
    }
    Notes = await notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(Notes);
  } catch (e) {
    res.send(e);
  }
});

// router 4: deletes notes
routers.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let Notes = await notes.findByIdAndDelete(req.params.id);
    if (!Notes) {
      return "Not found";
    }

    res.json("Deleted Suceefully");
  } catch (e) {
    res.send(e);
  }
  
});

module.exports = routers;
