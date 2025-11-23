// frontend/src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API, { API_ROOT, buildAssetUrl } from '../services/api';

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
  const content = about[lang];

  // Pour le RTL en arabe
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const textAlign = lang === 'ar' ? 'right' : 'left';

  return (
    <div className="container py-5" dir={dir}>
      {/* Bannière d’en-tête */}
      <div className="bg-primary text-white rounded-4 shadow p-5 mb-5 text-center">
        <h1 className="display-4 fw-bold">{t('nav.about')}</h1>
        <p className="lead">{t('home.subtitle')}</p>
      </div>

      <div className="row g-4">
        {/* Colonne gauche : Historique, Mission, Vision */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h2 className="mb-4 text-primary" style={{ textAlign }}>
                <i className="bi bi-journal-text me-2"></i>
                {lang === 'fr' ? 'Historique' : 'تاريخ'}
              </h2>
              <p className="lead" style={{ textAlign }}>{content.history}</p>

              <h3 className="mt-4 text-success" style={{ textAlign }}>
                <i className="bi bi-bullseye me-2"></i>
                {lang === 'fr' ? 'Mission' : 'المهمة'}
              </h3>
              <p style={{ textAlign }}>{content.mission}</p>

              <h3 className="mt-4 text-info" style={{ textAlign }}>
                <i className="bi bi-lightbulb me-2"></i>
                {lang === 'fr' ? 'Vision' : 'الرؤية'}
              </h3>
              <p style={{ textAlign }}>{content.vision}</p>

              {/* Valeurs */}
              <h3 className="mt-5 text-warning" style={{ textAlign }}>
                <i className="bi bi-stars me-2"></i>
                {lang === 'fr' ? 'Valeurs' : 'القيم'}
              </h3>
              <ul className="list-unstyled mt-3" style={{ textAlign }}>
                {content.values.map((value, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="badge bg-warning text-dark me-2">•</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Colonne droite : Bureau exécutif + Coordonnées */}
        <div className="col-lg-6">
          {/* Bureau exécutif */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0" style={{ textAlign }}>
                <i className="bi bi-people me-2"></i>
                {lang === 'fr' ? 'Bureau Exécutif' : 'المكتب التنفيذي'}
              </h4>
            </div>
            <div className="card-body">
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {about.executiveBoard && about.executiveBoard.length > 0 ? (
                  about.executiveBoard.map((member, index) => (
                    <div className="col" key={index}>
                      <div className="d-flex align-items-center p-3 bg-light rounded">
                        {member.photo ? (
                          <img
                            src={buildAssetUrl(member.photo)}
                            alt={member.name}
                            className="rounded-circle me-3"
                            style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = buildAssetUrl('/uploads/logos/Logo.png'); }}
                          />
                        ) : (
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '70px', height: '70px' }}>
                            <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
                          </div>
                        )}
                        <div style={{ textAlign }}>
                          <h5 className="mb-0">{member.name}</h5>
                          <small className="text-muted">{member.title}</small>
                          <div className="mt-1">
                            {member.email && (
                              <small className="d-block"><i className="bi bi-envelope me-1"></i> {member.email}</small>
                            )}
                            {member.phone && (
                              <small className="d-block"><i className="bi bi-telephone me-1"></i> {member.phone}</small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted" style={{ textAlign }}>{t('admin.noMembers')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0" style={{ textAlign }}>
                <i className="bi bi-geo-alt me-2"></i>
                {lang === 'fr' ? 'Coordonnées' : 'معلومات الاتصال'}
              </h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled" style={{ textAlign }}>
                <li className="mb-2">
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  <strong>{lang === 'fr' ? 'Adresse :' : 'العنوان :'}</strong> {about.address}
                </li>
                <li className="mb-2">
                  <i className="bi bi-telephone text-success me-2"></i>
                  <strong>{lang === 'fr' ? 'Téléphone :' : 'الهاتف :'}</strong> {about.phone}
                </li>
                <li className="mb-2">
                  <i className="bi bi-envelope text-primary me-2"></i>
                  <strong>Email :</strong> {about.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Carte Google Maps (facultatif) */}
      <div className="mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.480793726644!2d3.058461315268754!3d36.76619447247626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4ebc6b7b6b7b%3A0x7b6b7b6b7b6b7b6!2sAlger!5e0!3m2!1sen!2sdz!4v1632587650123!5m2!1sen!2sdz"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
          title="Localisation POSOC"
        ></iframe>
      </div>
    </div>
  );
}