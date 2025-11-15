// frontend/src/pages/AdminExecutiveBoard.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function AdminExecutiveBoard() {
  const { t } = useTranslation();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get('/about');
        setAbout(res.data);
      } catch (err) {
        alert(t('admin.loadAboutError'));
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, [t]);

  const handleAdd = async () => {
    const name = prompt(t('admin.executive.name'));
    const title = prompt(t('admin.executive.title'));
    const email = prompt(t('admin.executive.email'));
    const phone = prompt(t('admin.executive.phone'));

    if (!name || !title) return alert(t('admin.executive.required'));

    // Upload photo
    const photoUrl = await uploadPhoto();

    try {
      const res = await API.post('/about/executive', {
        name,
        title,
        email: email || null,
        phone: phone || null,
        photo: photoUrl || null
      });
      setAbout(res.data);
    } catch (err) {
      alert(t('admin.executive.addError'));
    }
  };

  const handleUpdate = async (index) => {
    const member = about.executiveBoard[index];
    const name = prompt(t('admin.executive.name'), member.name);
    const title = prompt(t('admin.executive.title'), member.title);
    const email = prompt(t('admin.executive.email'), member.email);
    const phone = prompt(t('admin.executive.phone'), member.phone);

    if (!name || !title) return alert(t('admin.executive.required'));

    // Upload photo (optionnel)
    const newPhoto = await uploadPhoto();
    const photo = newPhoto || member.photo;

    try {
      const res = await API.put(`/about/executive/${index}`, {
        name,
        title,
        email: email || null,
        phone: phone || null,
        photo
      });
      setAbout(res.data);
    } catch (err) {
      alert(t('admin.executive.updateError'));
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm(t('admin.executive.confirmDelete'))) return;
    try {
      await API.delete(`/about/executive/${index}`);
      setAbout(prev => ({
        ...prev,
        executiveBoard: prev.executiveBoard.filter((_, i) => i !== index)
      }));
    } catch (err) {
      alert(t('admin.executive.deleteError'));
    }
  };

  // Fonction utilitaire pour upload de photo
  const uploadPhoto = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('photo', file);

      try {
        const res = await API.post('/about/executive/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.photoUrl;
      } catch (err) {
        alert(t('admin.executive.uploadError'));
        return null;
      }
    };
    input.click();
  };

  if (loading) return <div className="container py-5">Chargement...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('admin.manageExecutiveBoard')}</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          {t('admin.executive.add')}
        </button>
      </div>

      <div className="row">
        {about.executiveBoard.map((member, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow">
              <div className="text-center p-3">
                {member.photo ? (
                  <img
                    src={`http://localhost:5000${member.photo}`}
                    alt={member.name}
                    className="rounded-circle mb-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mb-3"
                       style={{ width: '100px', height: '100px' }}>
                    <span className="display-6">👤</span>
                  </div>
                )}
                <h5>{member.name}</h5>
                <p className="text-muted">{member.title}</p>
                {member.email && <p className="small">{member.email}</p>}
                {member.phone && <p className="small">{member.phone}</p>}
              </div>
              <div className="card-body text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(index)}>
                  {t('admin.executive.edit')}
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>
                  {t('admin.executive.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-secondary">
          ← {t('admin.back')}
        </Link>
      </div>
    </div>
  );
}