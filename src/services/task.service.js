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

    updateTask(id, { title, done }) {
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        throw new BadRequestError('Title must be a non-empty string');
    }

    const updated = taskRepository.update(id, title?.trim(), done);
    if (!updated) throw new NotFoundError('Task not found');
    return updated;
    }

    deleteTask(id) {
    const deleted = taskRepository.delete(id);
    if (!deleted) throw new NotFoundError('Task not found');
    }



}

module.exports = new TaskService();