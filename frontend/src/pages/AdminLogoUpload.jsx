// frontend/src/pages/AdminLogoUpload.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function AdminLogoUpload() {
  const { t } = useTranslation();
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile) return alert(t('admin.selectLogo'));

    const formData = new FormData();
    formData.append('logo', logoFile);

    setLoading(true);
    try {
      const res = await API.post('/about/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(t('admin.logoUpdated'));
      // Optionnel : forcer le rafraîchissement du Navbar
      window.location.reload();
    } catch (err) {
      alert(t('admin.logoUpdateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2>{t('admin.changeLogo')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t('admin.selectNewLogo')}</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? t('admin.updating') : t('admin.updateLogo')}
        </button>
      </form>
    </div>
  );
}