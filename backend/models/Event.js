import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  eventType: {
    type: String,
    enum: ["event", "sports", "clubs"],
    required: true
  },
  subcategory: {
    type: String,
    lowercase: true,
    trim: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  image: {
    type: String // Main banner
  },
  images: [{
    type: String // Gallery/Carousel
  }],
  description: {
    type: String,
    required: true
  },
  // Sports Specific Fields
  matches: [{
    teamA: String,
    teamB: String,
    matchDate: Date,
    result: String,
    score: String
  }],
  teams: [{
    name: String,
    image: String,
    description: String
  }],
  // Clubs Specific Fields
  activities: [{
    name: String,
    description: String,
    time: String,
    participants: String
  }],
  achievements: [{
    year: String,
    title: String,
    recipient: String,
    description: String
  }],
  socialLinks: {
    instagram: String,
    twitter: String,
    website: String
  },
  status: {
    type: String,
    enum: ["upcoming", "past", "tba"],
    default: "upcoming"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
