import React from 'react';
import { Users, CheckSquare, Zap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Features = ({ id }) => {
    return (
        <section id={id} style={{
            padding: 'var(--space-lg) 0',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            scrollMarginTop: '80px' // For sticky navbar offset
        }}>
            <div style={{ width: '100%', maxWidth: '1000px', padding: '0 var(--space-md)' }}>
                <ScrollReveal>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '1rem' }}>
                        Tools for your <span style={{ color: 'var(--color-primary)' }}>Success</span>
                    </h1>
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
                        Everything you need to ace your exams and find your study tribe.
                    </p>
                </ScrollReveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Feature 1 */}
                    <ScrollReveal delay={100}>
                        <FeatureCard
                            icon={<Users size={32} color="var(--color-primary)" />}
                            title="Smart Matching"
                            description="Find your perfect study partner based on shared lectures, complementary strengths, and study habits. No more studying alone."
                        />
                    </ScrollReveal>

                    {/* Feature 2 */}
                    <ScrollReveal delay={200}>
                        <FeatureCard
                            icon={<CheckSquare size={32} color="var(--color-secondary)" />}
                            title="Task Manager"
                            description="Keep track of assignments, exams, and daily to-dos. Our built-in task manager ensures you never miss a deadline."
                        />
                    </ScrollReveal>

                    {/* Feature 3 */}
                    <ScrollReveal delay={300}>
                        <FeatureCard
                            icon={<Zap size={32} color="#f59e0b" />}
                            title="Daily Flashcards"
                            description="Keep your mind sharp with daily, bite-sized revision cards tailored to your subjects. Small steps lead to big grades."
                        />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s',
        cursor: 'default'
    }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{description}</p>
    </div>
);

export default Features;
