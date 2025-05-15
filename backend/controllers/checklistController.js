import Checklist from '../models/Checklist.js';

export const createChecklist = async (req, res) => {
  try {
    const { vehicle, items } = req.body;
    const userId = req.user._id;

    const parsedItems = JSON.parse(items);

    const images = req.files.images ? req.files.images.map(file => `/uploads/${file.filename}`) : [];
    const videos = req.files.videos ? req.files.videos.map(file => `/uploads/${file.filename}`) : [];
    const signature = req.files.signature ? `/uploads/${req.files.signature[0].filename}` : null;

    const checklist = new Checklist({
      vehicle,
      items: parsedItems,
      images,
      videos,
      signature,
      userId,
    });

    await checklist.save();

    res.status(201).json({ message: 'Checklist salvo com sucesso', checklist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar checklist' });
  }
};
