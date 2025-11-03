// frontend/src/pages/Documents.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Documents() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await API.get('/documents');
        setDocuments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

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

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.documents')}</h1>

      {loading ? (
        <p>Chargement...</p>
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
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
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