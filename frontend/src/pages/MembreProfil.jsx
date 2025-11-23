// frontend/src/pages/MembreProfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { API_ROOT, buildAssetUrl } from '../services/api';

export default function MembreProfil() {
  const [member, setMember] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
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

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Mettre à jour les champs texte
    Object.keys(member).forEach(key => {
      if (key !== 'logo') formData.append(key, member[key]);
    });

    // Ajouter le logo si sélectionné
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      const res = await API.put('/members/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMember(res.data);
      setLogoFile(null);
      alert('Profil mis à jour.');
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
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nom"
            value={member.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="domain"
            className="form-control"
            placeholder="Domaine"
            value={member.domain}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Localisation"
            value={member.location || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={member.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Téléphone"
            value={member.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="address"
            className="form-control"
            placeholder="Adresse"
            rows="2"
            value={member.address || ''}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Upload de logo */}
        <div className="mb-3">
          <label className="form-label">Logo (image)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {member.logo && (
            <img
              src={buildAssetUrl(member.logo)}
              alt="Logo actuel"
              className="mt-2"
              style={{ height: '80px', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = buildAssetUrl('/uploads/logos/Logo.png'); }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Supprimer mon association
        </button>
      </form>
    </div>
  );
}