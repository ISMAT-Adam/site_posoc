// frontend/src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-light text-center text-muted py-4 mt-auto border-top">
      <div className="container">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Plateforme des Organisations de la Société Civile (POSOC)
        </p>

        <p className="mb-3">
          <Link to="/contact" className="text-decoration-none text-muted me-3">
            {t('nav.contact')}
          </Link>
          <Link to="/a-propos" className="text-decoration-none text-muted me-3">
            {t('nav.about')}
          </Link>
          <Link to="/membres" className="text-decoration-none text-muted">
            {t('nav.members')}
          </Link>
        </p>

        {/* Réseaux sociaux avec React Icons */}
        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted text-decoration-none d-flex align-items-center">
            <FaFacebook className="me-1" /> Facebook
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted text-decoration-none d-flex align-items-center">
            <FaLinkedin className="me-1" /> LinkedIn
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-muted text-decoration-none d-flex align-items-center">
            <FaXTwitter className="me-1" /> X
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-muted text-decoration-none d-flex align-items-center">
            <FaYoutube className="me-1" /> YouTube
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted text-decoration-none d-flex align-items-center">
            <FaInstagram className="me-1" /> Instagram
          </a>
        </div>

        <p className="small text-muted mb-0">
          {t('home.subtitle')}
        </p>
      </div>
    </footer>
  );
}