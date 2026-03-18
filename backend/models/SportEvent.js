import mongoose from 'mongoose';

const sportEventSchema = new mongoose.Schema({
    sportType: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventImage: {
        type: String // Main banner
    },
    images: [{
        type: String // Carousel/Gallery
    }],
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
    socialLinks: {
        instagram: String,
        twitter: String,
        website: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SportEvent = mongoose.model('SportEvent', sportEventSchema);
export default SportEvent;
