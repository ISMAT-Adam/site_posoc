// frontend/src/pages/AdminDocumentForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDocumentForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('rapports');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Veuillez sélectionner un fichier.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('file', file);

    try {
      await API.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Document ajouté.');
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur lors de l’upload.');
    }
  };

  return (
    <div className="container py-5">
      <h2>Ajouter un document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre *</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie *</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="statuts">Statuts</option>
            <option value="rapports">Rapports</option>
            <option value="pv">Procès-verbaux</option>
            <option value="etudes">Études</option>
            <option value="autres">Autres</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Fichier (PDF ou Word) *</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Uploader</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/dashboard')}>
          Annuler
        </button>
      </form>
    </div>
  );
}