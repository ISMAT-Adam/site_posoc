// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    domain: '',
    location: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'member');
      navigate('/membres');
    } catch (err) {
      alert(err.response?.data?.msg || 'Erreur d’inscription');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">{t('nav.register')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nom de l'association *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email *"
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
                placeholder="Mot de passe *"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="domain"
                className="form-control"
                placeholder="Domaine d'intervention *"
                value={formData.domain}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Localisation (wilaya, ville)"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="address"
                className="form-control"
                placeholder="Adresse"
                rows="2"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">S'inscrire</button>
            <div className="text-center mt-3">
              <Link to="/login">{t('nav.login')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}