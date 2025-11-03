// src/pages/Members.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function Members() {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get('/members');
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{t('nav.members')}</h1>
        {token && (
          <Link to="/inscription" className="btn btn-success">
            Ajouter mon association
          </Link>
        )}
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="row">
          {members.map((member) => (
            <div className="col-md-6 col-lg-4 mb-4" key={member._id}>
              <div className="card h-100">
                {member.logo && (
                  <img src={member.logo} className="card-img-top" alt={member.name} style={{ height: '150px', objectFit: 'contain' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text"><strong>Domaine :</strong> {member.domain}</p>
                  <p className="card-text"><strong>Localisation :</strong> {member.location || 'Non spécifiée'}</p>
                  <p className="card-text"><small className="text-muted">{member.email}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {members.length === 0 && !loading && (
        <p>Aucune association membre pour le moment.</p>
      )}
    </div>
  );
}