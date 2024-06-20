import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

export async function fetchTasks() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createTask(task: any) {
  const response = await axios.post(API_URL, task);
  return response.data;
}

export async function updateTask(id: string, task: any) {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
}

export async function deleteTask(id: string) {
  console.log(id)
  await axios.delete(`${API_URL}/${id}`);
}
