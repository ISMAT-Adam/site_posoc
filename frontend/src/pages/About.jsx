// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function About() {
  const { t, i18n } = useTranslation();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get('/about');
        setAbout(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="container py-5 text-center">Chargement...</div>;
  if (!about) return <div className="container py-5 text-center">Contenu non disponible.</div>;

  const lang = i18n.language.startsWith('ar') ? 'ar' : 'fr';
  const content = about[lang]; // ✅ Correction essentielle
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const textAlign = lang === 'ar' ? 'right' : 'left';

  return (
    <div className="container py-5" dir={dir}>
      {/* En-tête */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-3">{t('nav.about')}</h1>
        <p className="lead text-muted">{t('home.subtitle')}</p>
      </div>

      <div className="row g-4 mb-5">
        {/* Colonne gauche : Historique, Mission, Vision, Valeurs */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-4">
                <h2 className="h4 text-primary mb-3" style={{ textAlign }}>
                  <i className="bi bi-journal-bookmark me-2"></i>
                  {lang === 'fr' ? 'Historique' : 'تاريخ'}
                </h2>
                <p className="fs-6" style={{ textAlign }}>{content.history}</p>
              </div>

              <div className="mb-4">
                <h3 className="h5 text-success mb-3" style={{ textAlign }}>
                  <i className="bi bi-bullseye me-2"></i>
                  {lang === 'fr' ? 'Mission' : 'المهمة'}
                </h3>
                <p className="fs-6" style={{ textAlign }}>{content.mission}</p>
              </div>

              <div className="mb-4">
                <h3 className="h5 text-info mb-3" style={{ textAlign }}>
                  <i className="bi bi-lightbulb me-2"></i>
                  {lang === 'fr' ? 'Vision' : 'الرؤية'}
                </h3>
                <p className="fs-6" style={{ textAlign }}>{content.vision}</p>
              </div>

              <div>
                <h3 className="h5 text-warning mb-3" style={{ textAlign }}>
                  <i className="bi bi-stars me-2"></i>
                  {lang === 'fr' ? 'Valeurs' : 'القيم'}
                </h3>
                <ul className="list-unstyled ps-3">
                  {content.values.map((val, i) => (
                    <li key={i} className="mb-2" style={{ textAlign }}>
                      <span className="text-warning me-1">•</span> {val}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : Coordonnées */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0" style={{ textAlign }}>
                <i className="bi bi-geo-alt me-2"></i>
                {lang === 'fr' ? 'Coordonnées' : 'معلومات الاتصال'}
              </h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2" style={{ textAlign }}>
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  <strong>{lang === 'fr' ? 'Adresse :' : 'العنوان :'}</strong> {about.address}
                </li>
                <li className="mb-2" style={{ textAlign }}>
                  <i className="bi bi-telephone text-success me-2"></i>
                  <strong>{lang === 'fr' ? 'Téléphone :' : 'الهاتف :'}</strong> {about.phone}
                </li>
                <li className="mb-2" style={{ textAlign }}>
                  <i className="bi bi-envelope text-primary me-2"></i>
                  <strong>Email :</strong> {about.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =================================== */}
      {/* BUREAU EXÉCUTIF EN BAS – PLEINE LARGEUR */}
      {/* =================================== */}
      <div className="mt-5 pt-4 border-top">
        <h2 className="text-center mb-5 display-6 fw-bold" style={{ color: '#0d6efd' }}>
          {lang === 'fr' ? 'Bureau Exécutif' : 'المكتب التنفيذي'}
        </h2>

        <div className="row g-4">
          {about.executiveBoard && about.executiveBoard.length > 0 ? (
            about.executiveBoard.map((member, index) => (
              <div className="col-md-6 col-lg-4 d-flex" key={index}>
                <div className="card shadow-sm h-100 w-100">
                  <div className="text-center p-4">
                    {member.photo ? (
                      <img
                        src={`http://localhost:5000${member.photo}`}
                        alt={member.name}
                        className="rounded-circle mb-4 border border-primary"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '120px', height: '120px' }}>
                        <i className="bi bi-person-fill text-secondary" style={{ fontSize: '3rem' }}></i>
                      </div>
                    )}
                    <h4 className="mb-2" style={{ fontSize: '1.5rem' }}>{member.name}</h4>
                    <p className="text-muted mb-3" style={{ fontSize: '1.25rem' }}>{member.title}</p>
                    <div className="mt-3">
                      {member.email && (
                        <p className="mb-1"><i className="bi bi-envelope me-2"></i> {member.email}</p>
                      )}
                      {member.phone && (
                        <p className="mb-1"><i className="bi bi-telephone me-2"></i> {member.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted fs-4">{t('admin.noMembers')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}