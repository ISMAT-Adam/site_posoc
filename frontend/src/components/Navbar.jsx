// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="http://localhost:5000/uploads/logos/Logo.png"
            alt="POSOC"
            height="30"
            className="me-2"
          />
          <span className="d-none d-md-inline">POSOC</span>
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
            <li className="nav-item"><Link className="nav-link" to="/">{t('nav.home')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/a-propos">{t('nav.about')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/membres">{t('nav.members')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/actualites">{t('nav.news')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/documents">{t('nav.documents')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">{t('nav.contact')}</Link></li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="btn-group me-2" role="group">
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={() => changeLanguage('fr')}
              >
                FR
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={() => changeLanguage('ar')}
              >
                عربي
              </button>
            </div>

            {token ? (
              <>
                {isAdmin && (
                  <Link to="/dashboard" className="btn btn-sm btn-warning me-2">
                    {t('nav.dashboard')}
                  </Link>
                )}
                <button className="btn btn-sm btn-light" onClick={handleLogout}>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-light">
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}