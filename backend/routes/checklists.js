import express from 'express';
import multer from 'multer';
import { createChecklist } from '../controllers/checklistController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/',
  verifyToken,
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 },
    { name: 'signature', maxCount: 1 },
  ]),
  createChecklist
);

export default router;
