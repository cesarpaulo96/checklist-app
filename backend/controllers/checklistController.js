import Checklist from '../models/Checklist.js';
import crypto from 'crypto';

export const createChecklist = async (req, res) => {
  const { vehicle, items } = req.body;
  const images = (req.files.images || []).map(f => f.path);
  const videos = (req.files.videos || []).map(f => f.path);
  const signature = req.files.signature?.[0]?.path || '';

  const sharedToken = crypto.randomBytes(16).toString('hex');

  const checklist = await Checklist.create({
    userId: req.user.id,
    vehicle,
    items: JSON.parse(items),
    images,
    videos,
    signature,
    sharedToken,
  });

  res.status(201).json(checklist);
};

export const getChecklists = async (req, res) => {
  const checklists = await Checklist.find({ userId: req.user.id });
  res.json(checklists);
};

export const getChecklistByToken = async (req, res) => {
  const checklist = await Checklist.findOne({ sharedToken: req.params.token });
  if (!checklist) return res.status(404).json({ error: 'Não encontrado' });
  res.json(checklist);
};
