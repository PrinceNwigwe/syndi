import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            style={{
                perspective: '1000px',
                width: '100%',
                height: '200px',
                cursor: 'pointer'
            }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
                {/* Front */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-md)',
                    boxShadow: 'var(--glass-shadow)'
                }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{question}</h3>
                    <span style={{ position: 'absolute', bottom: '10px', fontSize: '0.8rem', opacity: 0.5 }}>Click to flip</span>
                </div>

                {/* Back */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, var(--color-primary), #4f46e5)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-md)',
                    transform: 'rotateY(180deg)',
                    color: 'white'
                }}>
                    <p style={{ fontSize: '1.1rem' }}>{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
