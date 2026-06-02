import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;

            // Check if user already exists (Supabase sometimes returns success but with null session/user depending on config if duplicates are prevented)
            if (data.user && data.user.identities && data.user.identities.length === 0) {
                throw new Error('This email is already registered. Please log in.');
            }

            alert('Signup successful! Please check your email for the confirmation link.');
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err.message);
            let msg = err.message;
            if (msg.includes('already registered') || msg.includes('unique constraint')) {
                msg = 'This email is already taking. Please log in instead.';
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-bg) 100%)',
            padding: 'var(--space-md)',
            color: 'var(--color-text-main)'
        }}>
            <div className="auth-card" style={{
                background: 'var(--color-surface)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                // padding handled by CSS
                width: '100%',
                maxWidth: '450px',
                boxShadow: 'var(--glass-shadow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>

                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <img src="/logo.png" alt="Syndi" style={{ height: '50px', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Join Syndi and find your study circle</p>
                </div>

                {error && (
                    <div style={{ padding: '10px', background: 'rgba(220, 38, 38, 0.2)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(220, 38, 38, 0.5)' }}>
                        {error}
                    </div>
                )}

                {/* Signup Form */}

                {/* Signup Form */}
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: loading ? 'var(--color-text-muted)' : 'var(--color-primary)',
                            color: 'white',
                            padding: '0.8rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '0.5rem',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'} {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>Log in</Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;
