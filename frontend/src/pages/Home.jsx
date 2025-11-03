// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold">{t('home.title')}</h1>
          <p className="lead">{t('home.subtitle')}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
            <Link to="/membres" className="btn btn-primary btn-lg px-4 me-md-2">
              Découvrir les membres
            </Link>
            <Link to="/actualites" className="btn btn-outline-secondary btn-lg px-4">
              Voir les actualités
            </Link>
          </div>
        </div>
        <div className="col-lg-4 text-center">
          <div className="bg-primary bg-opacity-10 rounded-circle d-inline-block p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.261.261 0 0 1-.26.258H7.002Zm4-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
            </svg>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <h5>Valoriser les actions</h5>
          <p>Présentation des initiatives des associations membres.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Renforcer la collaboration</h5>
          <p>Espace sécurisé pour échanger et partager des ressources.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Visibilité accrue</h5>
          <p>Accès aux partenaires techniques et financiers.</p>
        </div>
      </div>
    </div>
  );
}