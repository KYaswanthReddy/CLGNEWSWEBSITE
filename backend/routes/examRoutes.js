import express from 'express';
import {
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
} from '../controllers/examController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.route('/')
    .get(getExams)
    .post(upload.single('image'), createExam);

router.route('/:id')
    .get(getExamById)
    .put(upload.single('image'), updateExam)
    .delete(deleteExam);

export default router;
