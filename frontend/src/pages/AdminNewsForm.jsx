// frontend/src/pages/AdminNewsForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

export default function AdminNewsForm() {
  const { id } = useParams(); // pour édition
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'actualite'
  });
  const [images, setImages] = useState([]); // nouveaux fichiers
  const [existingImages, setExistingImages] = useState([]); // images existantes (en édition)
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!id);

  // Charger l'actualité si édition
  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const res = await API.get(`/news/${id}`);
          setFormData({
            title: res.data.title,
            content: res.data.content,
            category: res.data.category
          });
          setExistingImages(res.data.images || []);
        } catch (err) {
          alert('Actualité non trouvée.');
          navigate('/dashboard');
        }
      };
      fetchNews();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('content', formData.content);
    payload.append('category', formData.category);

    // Ajouter les nouvelles images
    images.forEach(img => {
      payload.append('images', img);
    });

    try {
      if (isEditing) {
        await API.put(`/news/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/news', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      alert(isEditing ? 'Actualité mise à jour.' : 'Actualité créée.');
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExistingImage = (url) => {
    // ⚠️ Pour simplifier, on ne supprime pas les images existantes ici.
    // Dans une version avancée, tu pourrais envoyer une liste d'images à conserver.
    alert('La suppression d’images existantes n’est pas implémentée dans cette version.');
  };

  return (
    <div className="container py-5">
      <h2>{isEditing ? 'Modifier une actualité' : 'Créer une actualité'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie *</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="actualite">Actualité</option>
            <option value="evenement">Événement</option>
            <option value="communique">Communiqué</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Contenu *</label>
          <textarea
            className="form-control"
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        {/* Affichage des images existantes (édition) */}
        {isEditing && existingImages.length > 0 && (
          <div className="mb-3">
            <label>Images existantes</label>
            <div className="d-flex flex-wrap gap-2">
              {existingImages.map((url, i) => (
                <div key={i} className="position-relative">
                  <img src={url} alt="" style={{ height: '80px', objectFit: 'cover' }} className="border" />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={() => handleRemoveExistingImage(url)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Ajouter des images (max 10, JPG/PNG)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="form-text">
            Les nouvelles images seront ajoutées à celles existantes.
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/dashboard')}>
          Annuler
        </button>
      </form>
    </div>
  );
}