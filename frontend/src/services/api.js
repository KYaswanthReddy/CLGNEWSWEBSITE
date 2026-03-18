import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Events
export const getEvents = () => api.get('/events');
export const createEvent = (formData) => api.post('/events', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateEvent = (id, formData) => api.put(`/events/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Exams
export const getExams = () => api.get('/exams');
export const getExamSchedules = getExams; // Alias for backward compatibility
export const createExam = (data) => api.post('/exams', data);
export const updateExam = (id, data) => api.put(`/exams/${id}`, data);
export const deleteExam = (id) => api.delete(`/exams/${id}`);

// Clubs
export const getClubs = () => api.get('/clubs');
export const getClub = (name) => api.get(`/clubs/name/${name}`);
export const createClub = (formData) => api.post('/clubs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateClub = (id, formData) => api.put(`/clubs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteClub = (id) => api.delete(`/clubs/${id}`);
export const addClubUpdate = (name, formData) => api.post(`/clubs/${name}/updates`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateClubUpdate = (name, updateId, formData) => api.put(`/clubs/${name}/updates/${updateId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteClubUpdate = (name, updateId) => api.delete(`/clubs/${name}/updates/${updateId}`);

// Sports
export const getSports = () => api.get('/sports');
export const getSportsNews = getSports; // Alias for backward compatibility
export const createSports = (formData) => api.post('/sports', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateSports = (id, formData) => api.put(`/sports/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteSports = (id) => api.delete(`/sports/${id}`);

// Placements
export const getPlacements = () => api.get('/placements');
export const createPlacement = (formData) => api.post('/placements', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updatePlacement = (id, formData) => api.put(`/placements/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deletePlacement = (id) => api.delete(`/placements/${id}`);

// Achievements
export const getAchievements = () => api.get('/achievements');
export const createAchievement = (formData) => api.post('/achievements', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateAchievement = (id, formData) => api.put(`/achievements/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);

// Chat
export const sendChatMessage = (message) => {
    return api.post('/chat', { message });
};

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const adminLogin = (credentials) => api.post('/auth/admin-login', credentials);

export default api;
