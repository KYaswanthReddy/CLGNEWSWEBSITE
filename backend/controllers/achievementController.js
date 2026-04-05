import Achievement from '../models/Achievement.js';
import asyncHandler from 'express-async-handler';
import { fileToBase64 } from '../utils/fileUtils.js';

// @desc    Get all achievements (with optional filtering by type/subcategory and limit for carousel)
// @route   GET /api/achievements
// @access  Public
export const getAchievements = asyncHandler(async (req, res) => {
    const { type, subcategory, limit } = req.query;
    let query = {};

    if (type) query.type = type;
    if (subcategory) query.subcategory = subcategory.toLowerCase().trim();

    let mongooseQuery = Achievement.find(query).sort({ createdAt: -1 });
    
    if (limit) {
        mongooseQuery = mongooseQuery.limit(parseInt(limit, 10));
    }

    const achievements = await mongooseQuery;
    res.json(achievements);
});

// @desc    Get single achievement by ID
// @route   GET /api/achievements/:id
// @access  Public
export const getAchievementById = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);
    if (achievement) {
        res.json(achievement);
    } else {
        res.status(404);
        throw new Error('Achievement not found');
    }
});

// @desc    Create new achievement
// @route   POST /api/achievements
// @access  Private/Admin
export const createAchievement = asyncHandler(async (req, res) => {
    const { title, description, type, subcategory, year, socialLinks } = req.body;

    console.log('--- Creating Achievement ---');
    console.log('Body:', { title, type, subcategory, year });
    console.log('Files Received:', req.files ? Object.keys(req.files) : 'None');

    const achievementData = {
        title,
        description,
        type,
        year: parseInt(year, 10),
    };

    if (subcategory) {
        achievementData.subcategory = subcategory.toLowerCase().trim();
    }

    if (socialLinks) {
        try {
            achievementData.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
        } catch (error) {
            console.error('Error parsing socialLinks:', error);
        }
    }

    // Handle uploaded files
    if (req.files) {
        try {
            if (req.files.cardImage && req.files.cardImage.length > 0) {
                console.log('Processing cardImage:', req.files.cardImage[0].path);
                achievementData.cardImage = await fileToBase64(req.files.cardImage[0].path);
            }
            if (req.files.detailImage && req.files.detailImage.length > 0) {
                console.log('Processing detailImage:', req.files.detailImage[0].path);
                achievementData.detailImage = await fileToBase64(req.files.detailImage[0].path);
            }
        } catch (fileError) {
            console.error('Error processing achievement images:', fileError);
            res.status(500);
            throw new Error(`Failed to process images: ${fileError.message}`);
        }
    }

    if (!achievementData.cardImage) {
        console.error('Validation Error: Card image is missing');
        res.status(400);
        throw new Error('Card image is required');
    }

    const achievement = new Achievement(achievementData);
    const createdAchievement = await achievement.save();
    
    console.log('Achievement created successfully:', createdAchievement._id);
    res.status(201).json(createdAchievement);
});

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private/Admin
export const updateAchievement = asyncHandler(async (req, res) => {
    const { title, description, type, subcategory, year, socialLinks } = req.body;

    const achievement = await Achievement.findById(req.params.id);

    if (achievement) {
        achievement.title = title || achievement.title;
        achievement.description = description || achievement.description;
        achievement.type = type || achievement.type;
        achievement.year = year ? parseInt(year, 10) : achievement.year;
        
        if (subcategory) {
            achievement.subcategory = subcategory.toLowerCase().trim();
        }

        if (socialLinks) {
            achievement.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
        }

        if (req.files) {
            if (req.files.cardImage && req.files.cardImage.length > 0) {
                achievement.cardImage = await fileToBase64(req.files.cardImage[0].path);
            }

            if (req.files.detailImage && req.files.detailImage.length > 0) {
                achievement.detailImage = await fileToBase64(req.files.detailImage[0].path);
            }
        }

        const updatedAchievement = await achievement.save();
        res.json(updatedAchievement);
    } else {
        res.status(404);
        throw new Error('Achievement not found');
    }
});

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private/Admin
export const deleteAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);

    if (achievement) {
        await achievement.deleteOne();
        res.json({ message: 'Achievement removed' });
    } else {
        res.status(404);
        throw new Error('Achievement not found');
    }
});
