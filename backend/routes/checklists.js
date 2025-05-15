import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { createChecklist, getChecklists, getChecklistByToken } from '../controllers/checklistController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', auth, upload.fields([
  { name: 'images' },
  { name: 'videos' },
  { name: 'signature' }
]), createChecklist);

router.get('/', auth, getChecklists);
router.get('/share/:token', getChecklistByToken);

export default router;
