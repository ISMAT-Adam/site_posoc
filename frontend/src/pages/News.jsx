// frontend/src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function News() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get('/news');
        setNews(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des actualités:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getCategoryLabel = (cat) => {
    const labels = {
      actualite: t('news.categories.actualite'),
      evenement: t('news.categories.evenement'),
      communique: t('news.categories.communique')
    };
    return labels[cat] || cat;
  };

  if (loading) {
    return <div className="container py-5">Chargement des actualités...</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.news')}</h1>

      {news.length === 0 ? (
        <p>{t('news.noNews')}</p>
      ) : (
        <div className="row">
          {news.map((item) => (
            <div className="col-md-6 col-lg-4 mb-5" key={item._id}>
              <div className="card h-100 shadow-sm">
                {/* Image principale */}
                {item.images && item.images[0] && (
                  <img
                    src={`http://localhost:5000${item.images[0]}`}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted small">
                    {new Date(item.date).toLocaleDateString(i18n.language)}
                  </p>

                  {/* Extrait du contenu */}
                  <p className="card-text">
                    {item.content.substring(0, 120)}...
                  </p>

                  {/* Catégorie */}
                  <span className="badge bg-primary mb-3" style={{ width: 'fit-content' }}>
                    {getCategoryLabel(item.category)}
                  </span>

                  {/* Galerie d'images */}
                  {item.images && item.images.length > 1 && (
                    <div className="mt-2">
                      {item.images.slice(1, 4).map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000${img}`}
                          alt=""
                          className="rounded me-1"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ))}
                      {item.images.length > 4 && (
                        <small className="text-muted ms-2">+{item.images.length - 4} autres</small>
                      )}
                    </div>
                  )}

                  {/* Bouton "Lire la suite" -> vers une page de détail */}
                  <Link to={`/actualites/${item._id}`} className="btn btn-outline-secondary mt-auto">
                    {t('news.readMore')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}