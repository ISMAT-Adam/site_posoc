// backend/controllers/aboutController.js
const About = require('../models/About');

// ✅ Récupérer les données "À propos"
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Créer un contenu par défaut si inexistant
      about = new About({
        fr: {
          history: "La Plateforme des Organisations de la Société Civile (POSOC) a été fondée en 2020...",
          mission: "Fédérer les organisations de la société civile...",
          vision: "Une société civile forte, unie et influente...",
          values: ["Transparence", "Intégrité", "Collaboration", "Équité", "Engagement citoyen"]
        },
        ar: {
          history: "تأسست منصة منظمات المجتمع المدني (بوصوك) سنة 2020...",
          mission: "تجميع منظمات المجتمع المدني لتعزيز تأثيرها الجماعي...",
          vision: "مجتمع مدني قوي وموحّد ومؤثر...",
          values: ["الشفافية", "النزاهة", "التعاون", "الإنصاف", "الانخراط المواطني"]
        },
        executiveBoard: [
          {
            name: "Ahmed Benali",
            title: "Président",
            email: "ahmed@posoc.dz",
            phone: "+213 123 456 789",
            photo: "/uploads/photos/Zakaria.jpeg"
          }
        ],
        address: "10 Rue des Frères Bouadou, Alger, Algérie",
        phone: "+213 123 456 789",
        email: "contact@posoc.dz"
      });
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Mettre à jour les données générales (hors bureau exécutif)
exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) return res.status(404).json({ msg: 'Aucune donnée trouvée.' });

    // Mets à jour les champs FR/AR, coordonnées, etc.
    Object.assign(about, req.body);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la mise à jour.' });
  }
};

// ✅ Ajouter un membre du bureau exécutif
exports.addExecutiveMember = async (req, res) => {
  try {
    const { name, title, email, phone, photo } = req.body;
    const about = await About.findOne();

    if (!about) return res.status(404).json({ msg: 'Aucune donnée "À propos" trouvée.' });

    about.executiveBoard.push({ name, title, email, phone, photo });
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de l’ajout du membre.' });
  }
};

// ✅ Mettre à jour un membre du bureau exécutif (par index)
exports.updateExecutiveMember = async (req, res) => {
  try {
    const { index } = req.params;
    const { name, title, email, phone, photo } = req.body;
    const about = await About.findOne();

    if (!about || !about.executiveBoard[index]) {
      return res.status(404).json({ msg: 'Membre non trouvé.' });
    }

    about.executiveBoard[index] = { ...about.executiveBoard[index], name, title, email, phone, photo };
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la mise à jour.' });
  }
};

// ✅ Supprimer un membre du bureau exécutif (par index)
exports.deleteExecutiveMember = async (req, res) => {
  try {
    const { index } = req.params;
    const about = await About.findOne();

    if (!about || !about.executiveBoard[index]) {
      return res.status(404).json({ msg: 'Membre non trouvé.' });
    }

    about.executiveBoard.splice(index, 1);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la suppression.' });
  }
};