import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

router
  .post("/", isAuthenticated, createTodo)
  .get("/", getTodos)
  .put("/:todoId", isAuthenticated, updateTodo)
  .delete("/:todoId", isAuthenticated, deleteTodo)

export default router;
