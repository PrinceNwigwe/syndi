import React from 'react';
import { ArrowLeft, UserPlus, Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearnMore = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            padding: 'var(--space-lg)',
            background: 'linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-bg) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginBottom: '2rem'
                    }}
                >
                    <ArrowLeft size={20} /> Back to Home
                </button>

                <h1 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '1rem' }}>
                    How it <span style={{ color: 'var(--color-secondary)' }}>Works</span>
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                    Three simple steps to supercharge your studies.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Step
                        number="1"
                        icon={<UserPlus size={28} />}
                        title="Create your Profile"
                        description="Sign up and tell us your Major, University, and what subjects you are strong or weak in. This helps our algorithm understand you."
                    />
                    <Step
                        number="2"
                        icon={<Search size={28} />}
                        title="Get Matched"
                        description="Syndi automatically finds students who complement your skills. If you're great at History but bad at Math, we'll find a Math whiz who needs help with History."
                    />
                    <Step
                        number="3"
                        icon={<Calendar size={28} />}
                        title="Start Studying"
                        description="Connect with your matches, schedule sessions, and use our built-in tools like Task Managers and Flashcards to ace your courses together."
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button
                        onClick={() => navigate('/signup')}
                        style={{
                            background: 'var(--color-primary)',
                            color: 'white',
                            padding: '1rem 3rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700',
                            fontSize: '1.2rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
                        }}
                    >
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Step = ({ number, icon, title, description }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        background: 'var(--color-surface)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
    }}>
        <div style={{
            minWidth: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
        }}>
            {number}
        </div>
        <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>{description}</p>
        </div>
    </div>
);

export default LearnMore;
