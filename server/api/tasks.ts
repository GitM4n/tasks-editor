import express from 'express';
import Task from '../models/taskModel';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const {task_id, title, description, dueDate, labels } = req.body;
  const task = new Task({task_id, title, description, dueDate, labels });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
