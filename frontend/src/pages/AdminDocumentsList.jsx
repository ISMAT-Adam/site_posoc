// frontend/src/pages/AdminDocumentsList.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function AdminDocumentsList() {
  const { t } = useTranslation();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    API.get('/documents').then(res => setDocs(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDeleteDoc'))) return;
    try {
      await API.delete(`/documents/admin/${id}`);
      setDocs(docs.filter(d => d._id !== id));
      alert(t('admin.docDeleted'));
    } catch (err) {
      alert(t('admin.deleteError'));
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('admin.manageDocuments')} ({docs.length})</h2>
        <Link to="/admin/documents/new" className="btn btn-primary">
          {t('docs.upload')}
        </Link>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>{t('docs.title')}</th>
            <th>{t('docs.category')}</th>
            <th>{t('docs.date')}</th>
            <th>{t('admin.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(d => (
            <tr key={d._id}>
              <td>{d.title}</td>
              <td>{getCategoryLabel(d.category)}</td>
              <td>{new Date(d.uploadedAt).toLocaleDateString()}</td>
              <td>
                <a href={d.fileUrl} className="btn btn-sm btn-outline-primary me-2">
                  {t('docs.download')}
                </a>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d._id)}>
                  {t('admin.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}