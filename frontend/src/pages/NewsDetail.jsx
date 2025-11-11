// frontend/src/pages/NewsDetail.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

export default function NewsDetail() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get(`/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement de l’actualité:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return <div className="container py-5">Chargement...</div>;
  }

  if (!news) {
    return <div className="container py-5">Actualité non trouvée.</div>;
  }

  const getCategoryLabel = (cat) => {
    const labels = {
      actualite: t('news.categories.actualite'),
      evenement: t('news.categories.evenement'),
      communique: t('news.categories.communique')
    };
    return labels[cat] || cat;
  };

  return (
    <div className="container py-5">
      <Link to="/actualites" className="btn btn-secondary mb-4">
        ← {t('news.backToList')}
      </Link>

      <article>
        <h1>{news.title}</h1>
        <p className="text-muted">
          Publié le {new Date(news.date).toLocaleDateString(i18n.language)} •{' '}
          <span className="badge bg-primary">{getCategoryLabel(news.category)}</span>
        </p>

        {/* Affichage complet du contenu */}
        <div className="my-4">
          {news.images && news.images[0] && (
            <img
              src={`http://localhost:5000${news.images[0]}`}
              alt={news.title}
              className="img-fluid mb-4"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br />') }} />
        </div>

        {/* Galerie d'images */}
        {news.images && news.images.length > 1 && (
          <div className="mt-4">
            <h5>{t('news.gallery')}</h5>
            <div className="row">
              {news.images.slice(1).map((img, idx) => (
                <div className="col-3 mb-2" key={idx}>
                  <img
                    src={`http://localhost:5000${img}`}
                    alt=""
                    className="img-fluid rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}