const taskRepository = require('../repositories/task.repository');
const { NotFoundError, BadRequestError } = require('../errors');

class TaskService {
  async getAllTasks() {
    return await taskRepository.findAll();
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw new NotFoundError('Task not found');
    return task;
  }

  async createTask(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new BadRequestError('Title is required and must be a non-empty string');
    }
    return await taskRepository.create(title.trim());
  }

  async updateTask(id, { title, done }) {
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      throw new BadRequestError('Title must be a non-empty string');
    }

    const updated = await taskRepository.update(id, title?.trim(), done);
    if (!updated) throw new NotFoundError('Task not found');
    return updated;
  }

  async deleteTask(id) {
    const deleted = await taskRepository.delete(id);
    if (!deleted) throw new NotFoundError('Task not found');
  }
}

module.exports = new TaskService();