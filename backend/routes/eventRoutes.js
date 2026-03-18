import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getUpcomingEvents
} from '../controllers/eventController.js';
import upload from '../utils/upload.js'; // Assuming it exists based on other controller usage or need to create it

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(upload.single('image'), createEvent);

router.get('/upcoming', getUpcomingEvents);

router.route('/:id')
  .get(getEventById)
  .put(upload.single('image'), updateEvent)
  .delete(deleteEvent);

export default router;
