import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const About = ({ id }) => {
    return (
        <section id={id} style={{
            padding: 'var(--space-lg) 0',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            scrollMarginTop: '80px'
        }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 var(--space-md)' }}>
                <ScrollReveal>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>
                        Why We Built <span style={{ color: 'var(--color-primary)' }}>Syndi</span>
                    </h1>
                </ScrollReveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <ScrollReveal delay={100}>
                        <Section
                            title="The Problem"
                            content="University can be isolating. You sit in lecture halls with hundreds of people, yet finding someone to actually study with is surprisingly hard. Social media connects us, but not for learning. We end up studying alone, getting stuck on problems, and losing motivation."
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <Section
                            title="Our Mission"
                            content="Syndi exists to fix the 'Loneliness of the Long Distance Learner'. We believe that learning is inherently social. By connecting students with complementary skills—like matching a Physics expert with a Calculus whiz—we create a network where everyone lifts each other up."
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={300}>
                        <div style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--glass-border)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Built by Students, for Students.</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>We know the struggle because we live it.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

const Section = ({ title, content }) => (
    <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        backdropFilter: 'blur(10px)',
    }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>{title}</h2>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>{content}</p>
    </div>
);

export default About;
