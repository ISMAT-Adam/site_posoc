// src/pages/Contact.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../services/api';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Erreur lors de l’envoi du message.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('nav.contact')}</h1>

      <div className="row">
        <div className="col-lg-6">
          {success ? (
            <div className="alert alert-success">
              Votre message a été envoyé avec succès !
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          )}
        </div>
        <div className="col-lg-6">
          <h5>Coordonnées</h5>
          <p><strong>Adresse :</strong> Abéchè - En face de Force mixte Tchad Soudan</p>
          <p><strong>Téléphone :</strong> +235 66 34 00 13 - +235 66 32 08 48</p>
          <p><strong>Email :</strong> posoc51@gmail.com</p>
          <div className="mt-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Localisation POSOC"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}