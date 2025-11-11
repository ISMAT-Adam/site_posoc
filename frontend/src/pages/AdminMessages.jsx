// frontend/src/pages/AdminMessages.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function AdminMessages() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get('/contact/messages');
        setMessages(res.data);
      } catch (err) {
        console.error('Erreur:', err);
        alert(t('admin.loadMessagesError'));
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [t]);

  const markAsRead = async (id) => {
    try {
      await API.patch(`/contact/messages/${id}/read`);
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (err) {
      alert(t('admin.markReadError'));
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('admin.manageMessages')} ({messages.length})</h2>
        <Link to="/contact" className="btn btn-outline-secondary">
          {t('nav.contact')}
        </Link>
      </div>

      {loading ? (
        <p>{t('admin.loading')}</p>
      ) : messages.length === 0 ? (
        <p>{t('admin.noMessages')}</p>
      ) : (
        <div className="row">
          {messages.map((msg) => (
            <div className="col-12 mb-3" key={msg._id}>
              <div className={`card ${msg.read ? 'border-secondary' : 'border-primary'}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{msg.name}</h5>
                    <small className="text-muted">
                      {new Date(msg.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <p className="card-text"><strong>Email:</strong> {msg.email}</p>
                  <p className="card-text">{msg.message}</p>
                  {!msg.read && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => markAsRead(msg._id)}
                    >
                      {t('admin.markAsRead')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <Link to="/dashboard" className="btn btn-secondary">
          ← {t('admin.back')}
        </Link>
      </div>
    </div>
  );
}