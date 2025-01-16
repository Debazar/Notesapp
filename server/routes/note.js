import express from "express";
import Note from "../models/Note";
import middleware from "../middleware/middleware";
const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      desription,
      userId: req.user.id,
    });

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note created Succesfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Creating Note" });
  }
});

export default router;
