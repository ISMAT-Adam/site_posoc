// src/pages/Documents.jsx
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
      statuts: 'Statuts',
      rapports: 'Rapports',
      pv: 'Procès-verbaux',
      etudes: 'Études',
      autres: 'Autres'
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
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Action</th>
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
                      Télécharger
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {documents.length === 0 && !loading && (
        <p>Aucun document disponible.</p>
      )}
    </div>
  );
}