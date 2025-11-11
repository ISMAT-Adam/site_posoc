// frontend/src/pages/AdminMembersList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ← Import essentiel
import API from '../services/api';

export default function AdminMembersList() {
  const { t } = useTranslation(); // ← Initialise i18n
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get('/members');
        setMembers(res.data);
      } catch (err) {
        console.error('Erreur:', err);
        alert(t('admin.loadMembersError'));
      }
    };
    fetchMembers();
  }, [t]); // ← Dépendance sur t pour éviter les warnings

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDeleteMember'))) {
      return;
    }
    try {
      await API.delete(`/members/admin/${id}`);
      setMembers(members.filter(m => m._id !== id));
      alert(t('admin.memberDeleted'));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert(t('admin.deleteError'));
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('admin.manageMembers')} ({members.length})</h2>
        <button className="btn btn-primary" onClick={() => navigate('/membres')}>
          {t('admin.seePublicDirectory')}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>{t('auth.name')}</th>
              <th>{t('auth.domain')}</th>
              <th>{t('auth.email')}</th>
              <th>{t('auth.location')}</th>
              <th>{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  {t('admin.noMembers')}
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.domain}</td>
                  <td>{m.email}</td>
                  <td>{m.location || '—'}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}>
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}