// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ✅ Déclare l'état AVANT les fonctions
  const [formData, setFormData] = useState({ email: '', password: '' });

  // ✅ Fonction après useState → formData est défini
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role); // ← essentiel pour l'admin
      localStorage.setItem('userId', res.data.user.id);

      if (res.data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/membres');
      }
    } catch (err) {
      alert(err.response?.data?.msg || 'Erreur de connexion');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">{t('nav.login')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
            <div className="text-center mt-3">
              <Link to="/inscription">{t('nav.register')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}