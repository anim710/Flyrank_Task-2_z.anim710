const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');

router.get('/', async (req, res, next) => {
  try {
    res.json(await taskService.getAllTasks());
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await taskService.getTaskById(req.params.id));
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body.title);
    res.status(201).json(newTask);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;