// frontend/src/pages/AdminNewsList.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function AdminNewsList() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get('/news').then(res => setNews(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDeleteNews'))) return;
    try {
      await API.delete(`/news/admin/${id}`);
      setNews(news.filter(n => n._id !== id));
      alert(t('admin.newsDeleted'));
    } catch (err) {
      alert(t('admin.deleteError'));
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('admin.manageNews')} ({news.length})</h2>
        <Link to="/admin/news/new" className="btn btn-primary">
          {t('news.add')}
        </Link>
      </div>

      <div className="row">
        {news.map(n => (
          <div className="col-md-6 mb-4" key={n._id}>
            <div className="card">
              {n.images && n.images[0] && (
                <img src={n.images[0]} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5>{n.title}</h5>
                <p>{n.content.substring(0, 100)}...</p>
                <small className="text-muted">
                  {getCategoryLabel(n.category)} • {new Date(n.date).toLocaleDateString()}
                </small>
                <div className="mt-3">
                  <Link to={`/admin/news/edit/${n._id}`} className="btn btn-sm btn-outline-secondary me-2">
                    Modifier
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(n._id)}>
                    {t('admin.delete')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}