const express = require("express");
const taskRoute = express.Router();
const taskController = require("../controller/taskController");
taskRoute.get("/getTasks", taskController.getTasks);
taskRoute.post("/addTask", taskController.addTask);
taskRoute.delete("/deleteTask/:id", taskController.deleteTask);
taskRoute.put("/completed/:id", taskController.completeStatus);
taskRoute.put("/updateTask/:id", taskController.updateTask);
module.exports = taskRoute;
