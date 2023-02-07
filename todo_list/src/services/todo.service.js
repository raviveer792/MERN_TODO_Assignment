import { axiosInstance } from ".";

export const getTodos = () => {
  return axiosInstance.get(`todo`);
};

export const addTodo = (todo) => {
  return axiosInstance.post(`todo`, todo);
};

export const updateTodo = (todo) => {
  return axiosInstance.put(`todo`, todo);
};

export const deleteTodo = (id) => {
  return axiosInstance.delete(`todo/${id}`);
};
