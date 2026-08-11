const taskRepository = require('../repositories/task.repository');
const { NotFoundError, BadRequestError } = require('../errors');

class TaskService {
  getAllTasks() {
    return taskRepository.findAll();
  }

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) throw new NotFoundError('Task not found');
    return task;
  }
}

module.exports = new TaskService();