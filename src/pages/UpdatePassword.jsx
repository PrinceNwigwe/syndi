import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            alert('Password updated successfully! Redirecting to Dashboard...');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Error updating password: ' + error.message);
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
            <div style={{
                background: 'var(--color-surface)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem',
                width: '100%',
                maxWidth: '450px',
                boxShadow: 'var(--glass-shadow)',
                textAlign: 'center'
            }}>
                <img src="/logo.png" alt="Syndi" style={{ height: '50px', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Set New Password</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Create a strong password to secure your account.</p>

                <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 6 characters"
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
                                minLength={6}
                                required
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
                        {loading ? 'Updating...' : 'Update Password'} {!loading && <ArrowRight size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
