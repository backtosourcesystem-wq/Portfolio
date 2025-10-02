import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicesGrid from './components/ServicesGrid';
import PortfolioGallery from './components/PortfolioGallery';
import ReviewsComments from './components/ReviewsComments';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };



  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={handleLogout}
        onShowLogin={handleShowLogin}
      />
      <main>
        <Hero />
        <About onShowLogin={handleShowLogin} />
        <ServicesGrid />
        <PortfolioGallery />
        <ContactForm />
        <ReviewsComments />
      </main>
      <Footer />
    </div>
  );
}

export default App;
