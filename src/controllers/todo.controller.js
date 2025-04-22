// @ts-check
import Todo from "../models/Todo.js";
import { Types } from "mongoose";

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    const response = {
      status: "Success",
      result: todos,
      message: "All todos",
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    const todo = await Todo.create({
      name,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
        name: image.originalname,
      },
      user: new Types.ObjectId(req.user._id),
      status: "pending",
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const updateData = {
      name: req.body.name,
      status: req.body.status,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await todo.deleteOne();
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const updateData = {
      status: todo.status === "pending" ? "completed" : "pending",
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
