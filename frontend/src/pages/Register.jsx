// frontend/src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [alreadyHasAssociation, setAlreadyHasAssociation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAssociation = async () => {
      try {
        const res = await API.get('/members/me');
        if (res.status === 200) {
          setAlreadyHasAssociation(true);
        }
      } catch (err) {
        // 404 ou 401 → utilisateur n'a pas d'association
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      checkAssociation();
    } else {
      setLoading(false);
    }
  }, []);

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

  if (loading) return <div className="container py-5">Chargement...</div>;

  if (alreadyHasAssociation) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          {t('register.alreadyHasAssociation')}
        </div>
        <Link to="/mon-profil" className="btn btn-primary">
          {t('register.goToMyProfile')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{t('nav.register')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={t('auth.name')}
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
                placeholder={t('auth.email')}
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
                placeholder={t('auth.password')}
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
                placeholder={t('auth.domain')}
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
                placeholder={t('auth.location')}
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder={t('auth.phone')}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="address"
                className="form-control"
                placeholder={t('auth.address')}
                rows="2"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              {t('auth.registerBtn')}
            </button>
            <div className="text-center mt-3">
              <Link to="/login">{t('nav.login')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}