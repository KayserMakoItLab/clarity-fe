import ApiService from "../api";
import { LoginTypes, createTaskType } from "./types";

class TasksService extends ApiService {
  getAllTasks = (page: string) => {
    return this.get(`/tasks?page=${page}`);
  };

  getTaskById = (task_id: string) => {
    return this.get(`/tasks/${task_id}`);
  };

  createTask = (payload: createTaskType) => {
    return this.post("/tasks", payload);
  };

  editTaskById = (task_id:string, payload: createTaskType) => {
    return this.put(`/tasks/${task_id}`, payload);
  };

  deleteTask = (task_id: string) => {
    return this.delete(`/tasks/${task_id}`);
  };
}

const taskService = new TasksService();

export default taskService;
