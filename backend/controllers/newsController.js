// backend/controllers/newsController.js
const News = require('../models/News');

// ✅ Obtenir toutes les actualités
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Obtenir une actualité par ID (manquait !)
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'Actualité non trouvée.' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Créer une actualité
exports.createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/news/${file.filename}`) : [];

    const news = new News({ title, content, category, images });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la création.' });
  }
};

// ✅ Mettre à jour une actualité
exports.updateNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const existing = await News.findById(req.params.id);
    if (!existing) return res.status(404).json({ msg: 'Actualité non trouvée.' });

    const newImages = req.files ? req.files.map(file => `/uploads/news/${file.filename}`) : [];
    const allImages = [...existing.images, ...newImages];

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, category, images: allImages },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la mise à jour.' });
  }
};

// ✅ Supprimer une actualité (par soi-même ou par admin via la même logique)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ msg: 'Actualité non trouvée.' });
    res.json({ msg: 'Actualité supprimée.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la suppression.' });
  }
};

// ✅ Supprimer par ID (admin) — optionnel, car identique à deleteNews
// Tu peux garder les deux ou supprimer deleteNewsById
exports.deleteNewsById = async (req, res) => {
  return exports.deleteNews(req, res); // Réutilise la même logique
};

// backend/controllers/newsController.js
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'Actualité non trouvée.' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};