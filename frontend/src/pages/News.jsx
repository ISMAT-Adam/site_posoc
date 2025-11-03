// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function News() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get('/news');
        setNews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.news')}</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="row">
          {news.map((item) => (
            <div className="col-md-6 mb-4" key={item._id}>
              <div className="card h-100">
                {item.images && item.images[0] && (
                  <img src={item.images[0]} className="card-img-top" alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.content.substring(0, 120)}...</p>
                  <small className="text-muted">
                    Publié le {new Date(item.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}