// @ts-check
import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
} from "../controllers/todo.controller.js";
import { protect } from "../middlewares/auth.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

// router.use(protect);

router.route("/").get(getTodos).post(upload.single("image"), createTodo);

router.route("/:id").put(updateTodo).delete(deleteTodo);

router.patch("/status/:id", updateStatus);

export default router;
