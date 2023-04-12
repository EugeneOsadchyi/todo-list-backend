import { Router } from 'express';
import * as todoController from '../controllers/todoController';
import { checkRequiredBodyProperties } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', todoController.getTodos);
router.post('/', checkRequiredBodyProperties(['title']), todoController.createTodo);

router.put('/:id/markTodoCompleted', todoController.updateTodo((todo) => todo.completed = true));
router.put('/:id/markTodoUncompleted', todoController.updateTodo((todo) => todo.completed = false));

router.delete('/:id', todoController.deleteTodo);

export default router;
