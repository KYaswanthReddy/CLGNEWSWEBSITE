import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  eventType: {
    type: String,
    enum: ["event", "sports", "clubs"],
    required: true
  },
  subcategory: {
    type: String,
    default: null
  },
  eventName: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
