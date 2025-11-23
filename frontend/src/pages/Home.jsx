// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // ← Important
import { buildAssetUrl } from '../services/api';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container py-5 text-center">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold mb-4" style={{ color: '#0d47a1' }}>
            {t('home.title')}
          </h1>
          <p className="lead mb-5 text-muted">
            {t('home.subtitle')}
          </p>
          <div className="d-grid gap-3 d-md-flex justify-content-md-start">
            <Link to="/membres" className="btn btn-primary btn-lg px-5">
              Découvrir les membres
            </Link>
            <Link to="/actualites" className="btn btn-outline-primary btn-lg px-5">
              Voir les actualités
            </Link>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img
            src={buildAssetUrl('/uploads/logos/Logo.png')}
            alt="POSOC"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
      </div>

      <hr className="my-5" />

      <div className="row text-center mt-5">
        <div className="col-md-4">
          <div className="card border-0 h-100 shadow-sm">
            <div className="card-body">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-people fs-2 text-primary"></i>
              </div>
              <h4>Valoriser les actions</h4>
              <p>Présentation des initiatives des associations membres.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100 shadow-sm">
            <div className="card-body">
              <div className="bg-success bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-handshake fs-2 text-success"></i>
              </div>
              <h4>Renforcer la collaboration</h4>
              <p>Espace sécurisé pour échanger et partager des ressources.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100 shadow-sm">
            <div className="card-body">
              <div className="bg-danger bg-opacity-10 rounded-circle p-3 mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-bullseye fs-2 text-danger"></i>
              </div>
              <h4>Visibilité accrue</h4>
              <p>Accès aux partenaires techniques et financiers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}