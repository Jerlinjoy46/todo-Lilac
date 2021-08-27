const taskModels = require("../models/taskModels");

exports.addTask = (req, res) => {
  try {
    const { task, date, reminder } = req.body;
    const newTask = {
      task,
      date,
      reminder,
    };
    const newTasks = taskModels(newTask);
    newTasks.save();
    res.json({ message: "New Task Added...!" }).status(200);
  } catch (err) {
    if (err) throw err;
    res.json({ message: "Server is Down" }).status(500);
  }
};
exports.getTasks =async (req, res) => {
  try {
    taskModels
      .find({})
      .lean()
      .exec((err, doc) => {
        if (doc) return res.json(doc).status(200);
        res.json({ message: "Error in Geting Data" }).status(400);
      });
  } catch (err) {
    if (err) throw err;
    res.json({ message: "Server is Down" }).status(500);
  }
};

exports.deleteTask = async(req, res) => {
  try {
    const { id } = req.params;
    taskModels.findOneAndRemove(id, (err, doc) => {
      if (err) throw err;
      if (doc) return res.json({ message: "Task Deleted" }).status(200);
      res.json({ message: "Error in Deleteing Task" }).status(400);
    });
  } catch (err) {
    if (err) throw err;
    res.json({ message: "Server is Down" }).status(500);
  }
};
exports.completeStatus =async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleteds } = req.body;
    taskModels
      .findByIdAndUpdate(id, { isCompleteds: isCompleteds })
      .lean()
      .exec((err, doc) => {
        if (err) throw err;
        if (doc) return res.json({ message: "Completed...!" }).status(200);
        res.json({ message: "Error in Updateing" }).status(400);
      });
  } catch (err) {
    if (err) throw err;
    res.json({ message: "Server is Down" }).status(500);
  }
};
exports.updateTask = async(req,res) => {
  try {
    const {id} =req.params;
    const {task, date, reminder} = req.body;
    const updateTaskData = await taskModels.findByIdAndUpdate({_id:id},{task, date, reminder});
    if(updateTaskData) return res.json(updateTaskData).status(200);
    res.json({message:'Error in updateing'}).status(400);
  } catch (err) {
    if (err) throw err;
    res.json({ message: 'Server is Down' }).status(500);
  }
}