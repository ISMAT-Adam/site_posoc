// src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-light text-center text-muted py-4 mt-auto">
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Plateforme des Organisations de la Société Civile (POSOC)
        </p>
        <p className="mb-2">
          <Link to="/contact" className="text-decoration-none text-muted">
            {t('nav.contact')}
          </Link> • 
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="ms-2 text-muted">Facebook</a> •
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="ms-2 text-muted">LinkedIn</a> •
          <a href="https://x.com" target="_blank" rel="noreferrer" className="ms-2 text-muted">X</a>
        </p>
        <p className="small text-muted">
          {t('home.subtitle')}
        </p>
      </div>
    </footer>
  );
}