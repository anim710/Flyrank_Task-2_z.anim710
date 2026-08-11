const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');

router.get('/', (req, res, next) => {
  try {
    res.json(taskService.getAllTasks());
  } catch (err) { next(err); }
});

router.get('/:id', (req, res, next) => {
  try {
    res.json(taskService.getTaskById(req.params.id));
  } catch (err) { next(err); }
});

module.exports = router;