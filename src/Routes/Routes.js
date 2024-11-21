import express from "express";
import { createTodo } from "../Controller/Controller.js";
import { getTodo } from "../Controller/Controller.js";
import { updateStatus } from "../Controller/Controller.js";
import { deleteTodo } from "../Controller/Controller.js";

export const Routes = express.Router();

Routes.post("/create", createTodo);
Routes.get("/all", getTodo);
Routes.put("/status/:id", updateStatus);
Routes.delete("/delete/:id", deleteTodo);

