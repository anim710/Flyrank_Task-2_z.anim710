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

  // 👈 ADD THIS METHOD HERE
  createTask(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new BadRequestError('Title is required and must be a non-empty string');
    }
    return taskRepository.create(title.trim());
  }
}

module.exports = new TaskService();