import API from "./axios";

export const createTaskAPI = (data) => API.post("/tasks", data);
export const getTasksAPI = () => API.get("/tasks");
export const getTaskByIdAPI = (id) => API.get(`/tasks/${id}`);