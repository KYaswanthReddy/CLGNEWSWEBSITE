import express from 'express';
import {
  createPlacement,
  getPlacements,
  getSinglePlacement,
  updatePlacement,
  deletePlacement
} from '../controllers/placementController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.route('/')
  .get(getPlacements)
  .post(upload.single('logo'), createPlacement);

router.route('/:id')
  .get(getSinglePlacement)
  .put(upload.single('logo'), updatePlacement)
  .delete(deletePlacement);

export default router;
