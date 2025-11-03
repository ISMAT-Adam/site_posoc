// frontend/src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function About() {
  const { i18n } = useTranslation();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get('/about');
        setAbout(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="container py-5">Chargement...</div>;
  if (!about) return <div className="container py-5">Contenu non disponible.</div>;

  const lang = i18n.language.startsWith('ar') ? 'ar' : 'fr';
  const content = about[lang];

  return (
    <div className="container py-5">
      <h1 className="mb-4">{lang === 'fr' ? 'À propos' : 'من نحن'}</h1>

      {/* Historique, Mission, Vision */}
      <div className="row mb-5">
        <div className="col-lg-6">
          <h2>{lang === 'fr' ? 'Historique' : 'تاريخ'}</h2>
          <p>{content.history}</p>

          <h2 className="mt-4">{lang === 'fr' ? 'Mission' : 'المهمة'}</h2>
          <p>{content.mission}</p>

          <h2 className="mt-4">{lang === 'fr' ? 'Vision' : 'الرؤية'}</h2>
          <p>{content.vision}</p>
        </div>

        <div className="col-lg-6">
          <h2>{lang === 'fr' ? 'Valeurs' : 'القيم'}</h2>
          <ul>
            {content.values.map((val, i) => (
              <li key={i}>{val}</li>
            ))}
          </ul>

          {/* Coordonnées */}
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{lang === 'fr' ? 'Coordonnées' : 'معلومات الاتصال'}</h5>
              <p><strong>{lang === 'fr' ? 'Adresse' : 'العنوان'} :</strong> {about.address}</p>
              <p><strong>{lang === 'fr' ? 'Téléphone' : 'هاتف'} :</strong> {about.phone}</p>
              <p><strong>Email :</strong> {about.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bureau exécutif */}
      <div className="mt-5">
        <h2>{lang === 'fr' ? 'Bureau Exécutif' : 'المكتب التنفيذي'}</h2>
        <div className="row">
          {about.executiveBoard.map((member, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="text-center">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '120px', height: '120px' }}>
                    <span className="display-6">👤</span>
                  </div>
                )}
                <h5>{member.name}</h5>
                <p className="text-muted">{member.title}</p>
                {member.email && <p className="small">{member.email}</p>}
                {member.phone && <p className="small">{member.phone}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}