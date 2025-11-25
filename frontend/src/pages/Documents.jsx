// frontend/src/pages/Documents.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Documents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔒 Vérifie si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Optionnel : vérifie le rôle (membre ou admin)
    const role = localStorage.getItem('role');
    if (role !== 'member' && role !== 'admin') {
      navigate('/login', { replace: true });
      return;
    }

    // ✅ Charge les documents
    const fetchDocs = async () => {
      try {
        const res = await API.get('/documents');
        setDocuments(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des documents:', err);
        // Optionnel : rediriger si erreur 401/403
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [navigate]);

  const getCategoryLabel = (cat) => {
    const labels = {
      statuts: t('docs.categories.statuts'),
      rapports: t('docs.categories.rapports'),
      pv: t('docs.categories.pv'),
      etudes: t('docs.categories.etudes'),
      autres: t('docs.categories.autres')
    };
    return labels[cat] || cat;
  };

  if (loading) {
    return <div className="container py-5">Chargement...</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.documents')}</h1>

      {documents.length === 0 ? (
        <p>Aucun document disponible.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{t('docs.title')}</th>
                <th>{t('docs.category')}</th>
                <th>{t('docs.date')}</th>
                <th>{t('docs.action')}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td>{getCategoryLabel(doc.category)}</td>
                  <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      {t('docs.download')}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}