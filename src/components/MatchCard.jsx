import React from 'react';

const MatchCard = ({ name, role, strengths, weaknesses, matchScore }) => {
    return (
        <div className="glass-panel" style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'var(--transition-fast)',
            cursor: 'pointer'
        }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: `linear-gradient(to bottom, var(--color-primary), var(--color-secondary))`
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '1.2rem' }}>{name}</h3>
                    {matchScore > 100 && <span title="On Fire!" style={{ fontSize: '1.2rem' }}>🔥</span>}
                </div>
                <div style={{
                    background: 'rgba(var(--hue-primary), 100%, 50%, 0.2)',
                    color: 'var(--color-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                }}>
                    {matchScore}% Match
                </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{role}</p>

            <div style={{ marginTop: 'var(--space-xs)' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '4px' }}>CAN TEACH</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {strengths.map(s => (
                        <span key={s} style={{
                            background: 'rgba(var(--hue-secondary), 100%, 50%, 0.1)',
                            color: 'var(--color-secondary)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                        }}>{s}</span>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-xs)' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '4px' }}>NEEDS HELP</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {weaknesses.map(w => (
                        <span key={w} style={{
                            background: 'rgba(255, 100, 100, 0.1)',
                            color: '#ff6b6b',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                        }}>{w}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
