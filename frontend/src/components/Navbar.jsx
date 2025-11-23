// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROOT } from '../services/api';
import { buildAssetUrl } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm"
      style={{
        background: 'linear-gradient(90deg, #0d47a1, #1976d2) !important',
        color: 'black !important'
      }}
    >
      <div className="container">
        {/* Logo + Nom */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-black">
          <img
            src={buildAssetUrl('/uploads/logos/Logo.png')}
            alt="POSOC"
            height="40"
            className="me-3 rounded"
            style={{ display: 'inline-block' }}
          />
         
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-black" to="/">
                {t('nav.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/a-propos">
                {t('nav.about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/membres">
                {t('nav.members')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/actualites">
                {t('nav.news')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/documents">
                {t('nav.documents')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/contact">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Sélecteur de langue */}
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${i18n.language === 'fr' ? 'btn-light' : 'btn-outline-light'} btn-sm`}
                onClick={() => changeLanguage('fr')}
              >
                FR
              </button>
              <button
                type="button"
                className={`btn ${i18n.language === 'ar' ? 'btn-light' : 'btn-outline-light'} btn-sm`}
                onClick={() => changeLanguage('ar')}
              >
                عربي
              </button>
            </div>

            {/* Boutons authentification */}
            {token ? (
              <>
                {isAdmin && (
                  <Link to="/dashboard" className="btn btn-warning btn-sm px-3">
                    {t('nav.dashboard')}
                  </Link>
                )}
                <button className="btn btn-light btn-sm px-3" onClick={handleLogout}>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-light btn-sm px-3">
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}