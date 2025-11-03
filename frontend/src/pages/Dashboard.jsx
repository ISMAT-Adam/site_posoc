// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // ← Import essentiel
import API from '../services/api';

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ members: 0, documents: 0, news: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [membersRes, docsRes, newsRes, msgsRes] = await Promise.all([
          API.get('/members'),
          API.get('/documents'),
          API.get('/news'),
          API.get('/contact/messages').catch(() => ({ data: [] })) // évite l'erreur si route non implémentée
        ]);
        setStats({
          members: membersRes.data.length,
          documents: docsRes.data.length,
          news: newsRes.data.length,
          messages: msgsRes.data.filter?.(m => !m.read).length || 0
        });
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
      }
    };
    fetchStats();
  }, []);

  if (localStorage.getItem('role') !== 'admin') {
    return <div className="container py-5">Accès refusé.</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.dashboard')}</h1>

      {/* Statistiques */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5>Associations</h5>
              <h2 className="mb-0">{stats.members}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5>Documents</h5>
              <h2 className="mb-0">{stats.documents}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5>Actualités</h5>
              <h2 className="mb-0">{stats.news}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5>Messages non lus</h5>
              <h2 className="mb-0">{stats.messages}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Section de gestion */}
      <div className="mt-5">
        <h3>Gestion rapide</h3>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/admin/members" className="btn btn-outline-primary">Membres</Link>
          <Link to="/admin/news/new" className="btn btn-outline-primary">Nouvelle actualité</Link>
          <Link to="/admin/documents" className="btn btn-outline-primary">Documents</Link>
          <Link to="/admin/messages" className="btn btn-outline-primary">Messages</Link>
          <Link to="/admin/a-propos" className="btn btn-outline-primary">Modifier "À propos"</Link>
          <Link to="/admin/documents/new" className="btn btn-outline-primary">Ajouter un document</Link>
        </div>
      </div>
    </div>
  );
}