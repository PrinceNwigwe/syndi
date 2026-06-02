import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { supabase } from './lib/supabase';

import Features from './pages/Features';
import About from './pages/About';
import LearnMore from './pages/LearnMore';
import UpdatePassword from './pages/UpdatePassword';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/update-password');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/update-password';
  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-bg) 100%)',
      color: 'var(--color-text-main)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar - Hide on Auth pages only */}
      {!isAuthPage && (
        <nav style={{
          padding: 'var(--space-sm) var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--glass-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em', display: 'block' }}>
            <img src="/logo.png" alt="Syndi Logo" style={{ height: '50px', width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            {location.pathname === '/' ? (
              <>
                <a href="#features" style={linkStyle} onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}>Features</a>
                <a href="#about" style={linkStyle} onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}>About</a>
              </>
            ) : (
              <>
                <Link to="/#features" style={linkStyle}>Features</Link>
                <Link to="/#about" style={linkStyle}>About</Link>
              </>
            )}

            {session ? (
              <>
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '0.5rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>Login</Link>
                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    boxShadow: '0 4px 20px rgba(var(--hue-primary), 100%, 60%, 0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                  Get Started
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home navigate={navigate} session={session} />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;


const Home = ({ navigate, session }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main style={{ flex: 1 }}>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20vh',
        position: 'relative',
        overflow: 'hidden',
        padding: '20vh var(--space-lg) var(--space-lg)', // Explicit consistent padding
      }}>
        {/* Decorative Blobs */}
        <div className="animate-float" style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(var(--hue-primary), 100%, 50%, 0.15) 0%, rgba(0,0,0,0) 70%)',
          top: '-10%',
          right: '-5%',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div className="animate-float" style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(var(--hue-secondary), 100%, 50%, 0.1) 0%, rgba(0,0,0,0) 70%)',
          bottom: '0%',
          left: '-5%',
          zIndex: 0,
          animationDelay: '1s',
          pointerEvents: 'none'
        }} />

        <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <ScrollReveal>
            <h1 className="hero-title" style={{
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: 'var(--space-md)',
              background: 'linear-gradient(to right, #fff, var(--color-text-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Study Smarter,<br />
              <span style={{ color: 'var(--color-primary)', WebkitTextFillColor: 'var(--color-primary)' }}>Together.</span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-lg)',
              lineHeight: '1.6'
            }}>
              Syndi connects you with complementary study partners, organizes your schedule, creating a personalized learning path to academic success.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
              <button
                onClick={() => session ? navigate('/dashboard') : navigate('/signup')}
                style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 20px rgba(var(--hue-primary), 100%, 60%, 0.4)',
                  transition: 'transform 0.2s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                {session ? 'Go to Dashboard' : 'Start Learning Now'}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('features');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}>
                Learn More
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Features id="features" />
      <About id="about" />
    </main>
  );
};

const linkStyle = {
  fontWeight: '500',
  opacity: 0.8,
  transition: 'var(--transition-fast)',
  color: 'white',
  textDecoration: 'none'
};
