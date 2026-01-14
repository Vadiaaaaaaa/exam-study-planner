import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export const addExam = (data) => API.post('/exam', data);
export const addTopic = (data) => API.post('/topic', data);
export const generateSchedule = (data) => API.post('/generate', data);
