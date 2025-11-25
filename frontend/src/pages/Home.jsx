// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API, { buildAssetUrl } from '../services/api';

export default function Home() {
  const { t } = useTranslation();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les 3 dernières actualités
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        setNews(res.data.slice(0, 3)); // afficher seulement 3 actus
      } catch (err) {
        console.error("Erreur chargement news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

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
            className="img-fluid rounded shadow home-hero"
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

      {/* ACTUALITÉS RÉCENTES */}
      <hr className="my-5" />
      <h2 className="text-center mb-4">Actualités récentes</h2>

      {loading ? (
        <p className="text-center">Chargement des actualités...</p>
      ) : news.length === 0 ? (
        <p className="text-center">Aucune actualité disponible pour le moment.</p>
      ) : (
        <div className="row">
          {news.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm">
                {item.images && item.images[0] && (
                  <img
                    src={buildAssetUrl(item.images[0])}
                    alt={item.title}
                    className="card-img-top news-img"
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5>{item.title}</h5>
                  <p className="text-muted small">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p>{item.content.substring(0, 100)}...</p>

                  <Link
                    to={`/actualites/${item._id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Lire la suite
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-3">
        <Link to="/actualites" className="btn btn-primary px-4">
          Voir toutes les actualités
        </Link>
      </div>
    </div>
  );
}
