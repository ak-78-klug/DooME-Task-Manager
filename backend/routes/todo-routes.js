// const {Category} = require('../models/category');
const { Todo } = require("../models/todo");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const todoList = await Todo.find();

  if (!todoList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(todoList);
});

router.post("/", async (req, res) => {
  let todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  todo = await todo.save();

  if (!todo) return res.status(400).send("The task cannot be created!");

  res.send(todo);
});

router.patch("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      completed: req.body.completed,
    },
    { new: true }
  );

  if (!todo) return res.status(400).send("The task cannot be updated!");

  res.send(todo);
});

router.delete("/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (todo) {
        return res
          .status(200)
          .json({ success: true, message: "The task is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Task not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
