import Achievement from '../models/Achievement.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';

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
        achievementData.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    }

    // Handle uploaded files
    if (req.files) {
        if (req.files.cardImage && req.files.cardImage.length > 0) {
            achievementData.cardImage = `/uploads/${req.files.cardImage[0].filename}`;
        }
        if (req.files.detailImage && req.files.detailImage.length > 0) {
            achievementData.detailImage = `/uploads/${req.files.detailImage[0].filename}`;
        }
    }

    if (!achievementData.cardImage) {
        res.status(400);
        throw new Error('Card image is required');
    }

    const achievement = new Achievement(achievementData);
    const createdAchievement = await achievement.save();
    
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
                // Delete old cardImage
                if (achievement.cardImage) {
                    const oldPath = path.join(path.resolve(), achievement.cardImage);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                achievement.cardImage = `/uploads/${req.files.cardImage[0].filename}`;
            }

            if (req.files.detailImage && req.files.detailImage.length > 0) {
                // Delete old detailImage
                if (achievement.detailImage) {
                    const oldPath = path.join(path.resolve(), achievement.detailImage);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                achievement.detailImage = `/uploads/${req.files.detailImage[0].filename}`;
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
        // Delete images from uploads folder
        if (achievement.cardImage) {
            const cardImagePath = path.join(path.resolve(), achievement.cardImage);
            if (fs.existsSync(cardImagePath)) fs.unlinkSync(cardImagePath);
        }
        if (achievement.detailImage) {
            const detailImagePath = path.join(path.resolve(), achievement.detailImage);
            if (fs.existsSync(detailImagePath)) fs.unlinkSync(detailImagePath);
        }

        await achievement.deleteOne();
        res.json({ message: 'Achievement removed' });
    } else {
        res.status(404);
        throw new Error('Achievement not found');
    }
});
