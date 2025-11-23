import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function AdminPendingMembers() {
  const { t } = useTranslation();
  const [pendingMembers, setPendingMembers] = useState([]);

  useEffect(() => {
    API.get('/members/pending').then(res => setPendingMembers(res.data));
  }, []);

  const approve = async (id) => {
    await API.put(`/members/approve/${id}`);
    setPendingMembers(pendingMembers.filter(m => m._id !== id));
  };

  const reject = async (id) => {
    await API.put(`/members/reject/${id}`);
    setPendingMembers(pendingMembers.filter(m => m._id !== id));
  };

  return (
    <div className="container py-5">
      <h2>Demandes d'adhésion en attente ({pendingMembers.length})</h2>
      {pendingMembers.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <div className="row">
          {pendingMembers.map(m => (
            <div className="col-md-6 mb-4" key={m._id}>
              <div className="card">
                <div className="card-body">
                  <h5>{m.name}</h5>
                  <p><strong>{t('auth.domain')}:</strong> {m.domain}</p>
                  <p><strong>{t('auth.email')}:</strong> {m.email}</p>
                  <button className="btn btn-success btn-sm me-2" onClick={() => approve(m._id)}>
                    Approuver
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => reject(m._id)}>
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}