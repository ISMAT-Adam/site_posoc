// frontend/src/pages/AdminAboutEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminAboutEdit() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get('/about');
      setData(res.data);
    };
    fetch();
  }, []);

  const handleChange = (lang, field, value) => {
    setData(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value }
    }));
  };

  const handleBoardChange = (index, field, value) => {
    const newBoard = [...data.executiveBoard];
    newBoard[index][field] = value;
    setData({ ...data, executiveBoard: newBoard });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put('/about', data);
    alert('Page "À propos" mise à jour.');
    navigate('/dashboard');
  };

  if (!data) return <div className="container py-5">Chargement...</div>;

  return (
    <div className="container py-5">
      <h2>Modifier la page "À propos"</h2>
      <form onSubmit={handleSubmit}>
        {/* FR */}
        <h4>Français</h4>
        <div className="mb-3">
          <label>Histoire</label>
          <textarea
            className="form-control"
            value={data.fr.history || ''}
            onChange={(e) => handleChange('fr', 'history', e.target.value)}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label>Mission</label>
          <textarea
            className="form-control"
            value={data.fr.mission || ''}
            onChange={(e) => handleChange('fr', 'mission', e.target.value)}
            rows="2"
          />
        </div>
        {/* ... ajoute vision, valeurs (tableau), etc. */}

        {/* Coordonnées */}
        <h4>Coordonnées</h4>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Adresse"
            value={data.address || ''}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>

        {/* Bureau exécutif */}
        <h4>Bureau exécutif</h4>
        {data.executiveBoard.map((m, i) => (
          <div key={i} className="row mb-3">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Nom"
                value={m.name || ''}
                onChange={(e) => handleBoardChange(i, 'name', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Fonction"
                value={m.title || ''}
                onChange={(e) => handleBoardChange(i, 'title', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Email"
                value={m.email || ''}
                onChange={(e) => handleBoardChange(i, 'email', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Photo URL"
                value={m.photo || ''}
                onChange={(e) => handleBoardChange(i, 'photo', e.target.value)}
              />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  );
}