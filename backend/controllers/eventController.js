import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { eventType, subcategory, eventName, date, month, year, description } = req.body;
  
  const event = new Event({
    eventType,
    subcategory,
    eventName,
    date,
    month,
    year,
    description,
    image: req.file ? `/uploads/${req.file.filename}` : req.body.image
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Get all events with optional filtering
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { type, subcategory } = req.query;
  const filter = {};

  if (type) filter.eventType = type;
  if (subcategory) filter.subcategory = subcategory;

  const events = await Event.find(filter).sort({ createdAt: -1 });
  res.json(events);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { eventType, subcategory, eventName, date, month, year, description } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.eventType = eventType || event.eventType;
    event.subcategory = subcategory || event.subcategory;
    event.eventName = eventName || event.eventName;
    event.date = date || event.date;
    event.month = month || event.month;
    event.year = year || event.year;
    event.description = description || event.description;
    
    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      event.image = req.body.image;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};
