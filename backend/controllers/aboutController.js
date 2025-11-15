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
            photo: "/uploads/photos/president.jpg"
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

// ✅ Mettre à jour les données générales "À propos"
exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      return res.status(404).json({ msg: 'Aucune donnée de "À propos" trouvée.' });
    }

    // Mets à jour les champs
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

    if (!about) {
      return res.status(404).json({ msg: 'Aucune donnée de "À propos" trouvée.' });
    }

    about.executiveBoard.push({
      name,
      title,
      email: email || null,
      phone: phone || null,
      photo: photo || null
    });

    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de l’ajout du membre.' });
  }
};

// ✅ Supprimer un membre du bureau exécutif
exports.deleteExecutiveMember = async (req, res) => {
  try {
    const { index } = req.params; // index du membre dans le tableau
    const about = await About.findOne();

    if (!about || !about.executiveBoard[index]) {
      return res.status(404).json({ msg: 'Membre non trouvé.' });
    }

    about.executiveBoard.splice(index, 1);
    await about.save();
    res.json({ msg: 'Membre supprimé.', about });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la suppression.' });
  }
};

// ✅ Mettre à jour un membre du bureau exécutif
exports.updateExecutiveMember = async (req, res) => {
  try {
    const { index } = req.params;
    const { name, title, email, phone, photo } = req.body;
    const about = await About.findOne();

    if (!about || !about.executiveBoard[index]) {
      return res.status(404).json({ msg: 'Membre non trouvé.' });
    }

    about.executiveBoard[index] = {
      ...about.executiveBoard[index],
      name,
      title,
      email: email || null,
      phone: phone || null,
      photo: photo || null
    };

    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la mise à jour.' });
  }
};