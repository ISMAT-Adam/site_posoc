// frontend/src/pages/MembreProfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function MembreProfil() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyMember = async () => {
      try {
        const res = await API.get('/members/me');
        setMember(res.data);
      } catch (err) {
        alert('Accès refusé ou profil non trouvé.');
        navigate('/membres');
      } finally {
        setLoading(false);
      }
    };
    fetchMyMember();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/members/me', member);
      alert('Profil mis à jour avec succès.');
    } catch (err) {
      alert('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer votre association ?')) return;
    try {
      await API.delete('/members/me');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  if (loading) return <div className="container py-5">Chargement...</div>;

  return (
    <div className="container py-5">
      <h2>Gérer mon association</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            className="form-control"
            value={member.name}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Domaine</label>
          <input
            className="form-control"
            value={member.domain}
            onChange={(e) => setMember({ ...member, domain: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Localisation</label>
          <input
            className="form-control"
            value={member.location || ''}
            onChange={(e) => setMember({ ...member, location: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            className="form-control"
            value={member.phone || ''}
            onChange={(e) => setMember({ ...member, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <textarea
            className="form-control"
            value={member.address || ''}
            onChange={(e) => setMember({ ...member, address: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Supprimer mon association
        </button>
      </form>
    </div>
  );
}