// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import News from './pages/News';
import Documents from './pages/Documents';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MembreProfil from './pages/MembreProfil';
import AdminNewsForm from './pages/AdminNewsForm';
import AdminAboutEdit from './pages/AdminAboutEdit';
import AdminDocumentForm from './pages/AdminDocumentForm';
import AdminDocumentsList from './pages/AdminDocumentsList';
import AdminMembersList from './pages/AdminMembersList';
import AdminMessages from './pages/AdminMessages';
import AdminNewsList from './pages/AdminNewsList';
import NewsDetail from './pages/NewsDetail';
import AdminExecutiveBoard from './pages/AdminExecutiveBoard';

function App() {
  return (
    <Router>
      <div dir="auto"> {/* Gère automatiquement LTR/RTL selon la langue */}
        <Navbar />
        <main className="min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/membres" element={<Members />} />
            <Route path="/actualites" element={<News />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mon-profil" element={<MembreProfil />} />
            <Route path="/admin/a-propos" element={<AdminAboutEdit />} />
            <Route path="/admin/news/new" element={<AdminNewsForm />} />
            <Route path="/admin/news/edit/:id" element={<AdminNewsForm />} />
            <Route path="/admin/documents/new" element={<AdminDocumentForm />} />
            <Route path="/admin/documents" element={<AdminDocumentsList />} />
            <Route path="/admin/members" element={<AdminMembersList />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/news" element={<AdminNewsList />} />
            <Route path="/actualites/:id" element={<NewsDetail />} />
            <Route path="/admin/executive" element={<AdminExecutiveBoard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;