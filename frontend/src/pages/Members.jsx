// frontend/src/pages/Members.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Members() {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/members');
        setMembers(res.data);
        setFilteredMembers(res.data); // Afficher tous les membres au départ
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // frontend/src/pages/Members.jsx
useEffect(() => {
  const fetch = async () => {
    const res = await API.get('/members?status=approved'); // ← ajout du filtre
    setMembers(res.data);
    setFilteredMembers(res.data);
  };
  fetch();
}, []);

  // Fonction de filtrage
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
    } else {
      const term = searchTerm.toLowerCase();
      const results = members.filter(m =>
        m.name.toLowerCase().includes(term) ||
        (m.domain && m.domain.toLowerCase().includes(term)) ||
        (m.location && m.location.toLowerCase().includes(term))
      );
      setFilteredMembers(results);
    }
  }, [searchTerm, members]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const token = localStorage.getItem('token');

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{t('nav.members')}</h1>
        {token && (
          <a href="/inscription" className="btn btn-success">
            {t('members.add')}
          </a>
        )}
      </div>

      {/* Barre de recherche */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={t('members.search')}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center">Aucune association trouvée.</p>
      ) : (
        <div className="row">
          {filteredMembers.map((member) => (
            <div className="col-md-6 col-lg-4 mb-4" key={member._id}>
              <div className="card h-100">
                {member.logo && (
                  <img
                    src={member.logo}
                    className="card-img-top"
                    alt={member.name}
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">
                    <strong>{t('auth.domain')}:</strong> {member.domain}
                  </p>
                  <p className="card-text">
                    <strong>{t('auth.location')}:</strong> {member.location || 'Non spécifiée'}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{member.email}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}