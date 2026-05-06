import Task from "../models/Task.js";
import redisClient from "../config/redisClient.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;

    const task = await Task.create({
      userId: req.user._id,
      title,
      inputText,
      operation,
      status: "pending",
      logs: ["Task created"],
    });
    await redisClient.lPush(
        "taskQueue",
        task._id.toString()
    );

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Single Task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};