import { Router } from 'express';
import { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from '../controllers/todo.controller.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.use(protect);

router.route('/')
  .get(getTodos)
  .post(upload.single('image'), createTodo);

router.route('/:id')
  .put(upload.single('image'), updateTodo)
  .delete(deleteTodo);

export default router;