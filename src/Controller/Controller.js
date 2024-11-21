import prisma from "../Config/Prisma.js";
import { handleError } from "../Utils/ErrorHandler.js";
import { todoSchema } from "../Utils/SchemaJoi/Type.js";

export const createTodo = async (req, res) => {
  const { title, description } = req.body;

  const { error } = todoSchema.validate({ title, description });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const findTitle = await prisma.todolist.findFirst({
    where: {
      title,
    },
  });

  if (findTitle) {
    return res.status(400).json({ message: "Title already exist" });
  }

  try {
    await prisma.todolist.create({
      data: {
        title,
        description,
        status: false,
      },
    });
    return res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await prisma.todolist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ data: todo });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todolist.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await prisma.todolist.update({
      where: { id },
      data: {
        status: !todo.status,
      },
    });

    return res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    handleError(res, error);
  }
};


export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todolist.findUnique({
      where: { id },      
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }   

    await prisma.todolist.delete({
      where: { id },
    }); 

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};