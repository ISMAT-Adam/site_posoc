// src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buildAssetUrl } from '../services/api';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        {/* Première ligne : Logo + Description + Liens rapides */}
        <div className="row mb-4">
          {/* Logo et description */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center">
              <img
                src={buildAssetUrl('/uploads/logos/Logo.png')}
                alt="POSOC"
                className="me-3"
                style={{ height: '60px', objectFit: 'contain' }}
              />
              <h5 className="fw-bold text-uppercase fs-4">POSOC</h5>
            </div>
            <p className="mt-3 fs-6 text-light">
              Plateforme des Organisations de la Société Civile – Renforçons ensemble l’engagement citoyen.
            </p>
          </div>

          {/* Contacts */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-uppercase fs-5">{t('nav.contact')}</h6>
            <ul className="list-unstyled mt-3 fs-6">
              <li className="mb-2">📍 Abéché, Ouaddai - Tchad</li>
              <li className="mb-2">📞 +235 66 32 08 48</li>
              <li className="mb-2">📞 +235 66 34 00 13</li>
              <li className="mb-2">✉️ <a href="mailto:posoc51@gmail.com" className="text-white text-decoration-none">posoc51@gmail.com</a></li>
            </ul>
          </div>

          {/* Suivez-nous */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-uppercase fs-5">{t('Reseaux Sociaux')}</h6>
            <div className="d-flex gap-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <hr className="my-4 border-light" />

        {/* Liens rapides */}
        <div className="row mb-4">
          <div className="col-12">
            <h6 className="fw-bold text-uppercase fs-5 mb-3">Liens rapides</h6>
            <div className="d-flex flex-wrap gap-4 fs-6">
              <Link to="/" className="text-white text-decoration-none">Accueil</Link>
              <Link to="/a-propos" className="text-white text-decoration-none">À propos</Link>
              <Link to="/membres" className="text-white text-decoration-none">Membres</Link>
              <Link to="/actualites" className="text-white text-decoration-none">Actualités</Link>
              <Link to="/documents" className="text-white text-decoration-none">Documents</Link>
              <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-light pt-3 border-top border-secondary">
          <p className="mb-0 fs-6">
            &copy; {new Date().getFullYear()} POSOC. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}