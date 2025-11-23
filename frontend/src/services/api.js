// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Base server URL (sans /api) utile pour construire les URLs d'assets
const API_ROOT = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

// Construit une URL d'asset robuste :
// - accepte une URL complète (retournée telle quelle)
// - accepte un chemin commençant par '/' (préfixe par API_ROOT)
// - accepte un chemin relatif (préfixe par API_ROOT + '/')
// - encode les caractères spéciaux (espaces) via encodeURI
function buildAssetUrl(p) {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  const root = API_ROOT.replace(/\/$/, '');
  if (p.startsWith('/')) return encodeURI(root + p);
  return encodeURI(root + '/' + p);
}

export { API_ROOT, buildAssetUrl };

// Ajouter le token JWT automatiquement
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default API;