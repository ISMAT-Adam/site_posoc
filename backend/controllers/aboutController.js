// backend/controllers/aboutController.js
const About = require('../models/About');

exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Créer un contenu par défaut si inexistant
      about = new About({
        fr: {
          history: "La Plateforme des Organisations de la Société Civile (POSOC) a été fondée en 2020 pour fédérer les associations algériennes autour d’objectifs communs de développement.",
          mission: "Fédérer les organisations de la société civile pour renforcer leur impact collectif.",
          vision: "Une société civile forte, unie et influente au service du développement durable.",
          values: ["Transparence", "Intégrité", "Collaboration", "Équité", "Engagement citoyen"]
        },
        ar: {
          history: "تأسست منصة منظمات المجتمع المدني (بوصوك) سنة 2020 لتجميع الجمعيات الجزائرية حول أهداف مشتركة للتنمية.",
          mission: "تجميع منظمات المجتمع المدني لتعزيز تأثيرها الجماعي.",
          vision: "مجتمع مدني قوي وموحّد ومؤثر في خدمة التنمية المستدامة.",
          values: ["الشفافية", "النزاهة", "التعاون", "الإنصاف", "الانخراط المواطني"]
        },
        executiveBoard: [
          {
            name: "Aboulkhassim Mahamat Hassan",
            title: "Directeur Général",
            email: "aboulkhassimmahamathassan@gmail.com",
            phone: "+235",
            photo: "/home/ismat/projets/posoc-platform/backend/uploads/photos/aboulkhassim.jpg"
          },
          {
            name: "Fatima Zohra",
            title: "Secrétaire Générale",
            email: "fatima@posoc.dz",
            photo: "/uploads/photos/secretary.jpg"
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

exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};