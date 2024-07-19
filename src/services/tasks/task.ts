import ApiService from "../api";
import { LoginTypes } from "./types";

class TasksService extends ApiService {

  getAllTasks = () => {
    return this.get(`/tasks`);
  }

  // signIn = (body: LoginTypes) => {
  //   console.log("body", body);
    
  //   return this.post("/login", {
  //     email: body.email,
  //     password: body.password,
  //   });
  // };
}

const taskService = new TasksService();

export default taskService;
