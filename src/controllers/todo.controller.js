import Todo from '../models/Todo.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const todo = await Todo.create({
      name,
      image: imagePath,
      status: status || 'pending',
      user: req.user._id
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
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const updateData = {
      name: req.body.name || todo.name,
      status: req.body.status || todo.status
    };

    if (req.file) {
      if (todo.image) {
        const oldImagePath = path.join(__dirname, '..', '..', todo.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

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
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    if (todo.image) {
      const imagePath = path.join(__dirname, '..', '..', todo.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await todo.deleteOne();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    next(error);
  }
};