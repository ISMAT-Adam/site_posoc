// frontend/src/pages/AdminDocumentsList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDocumentsList() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get('/documents');
      setDocs(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce document ?')) return;
    await API.delete(`/documents/${id}`);
    setDocs(docs.filter(d => d._id !== id));
  };

  return (
    <div className="container py-5">
      <h2>Gestion des documents</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/admin/documents/new')}>
        Ajouter un document
      </button>
      <table className="table">
        <thead><tr><th>Titre</th><th>Catégorie</th><th>Actions</th></tr></thead>
        <tbody>
          {docs.map(d => (
            <tr key={d._id}>
              <td>{d.title}</td>
              <td>{d.category}</td>
              <td>
                <a href={d.fileUrl} className="btn btn-sm btn-outline-primary me-2">Voir</a>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}