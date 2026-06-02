import React from 'react';

const ScheduleView = () => {
    const events = [
        { time: '09:00', title: 'Maths Revision', type: 'study' },
        { time: '11:00', title: 'Physics Group Study', type: 'group' },
        { time: '14:00', title: 'History Flashcards', type: 'review' },
    ];

    return (
        <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)'
        }}>
            <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.2rem' }}>Today's Schedule</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {events.map((ev, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <div style={{
                            width: '50px',
                            fontSize: '0.9rem',
                            color: 'var(--color-text-muted)',
                            textAlign: 'right'
                        }}>{ev.time}</div>
                        <div style={{
                            flex: 1,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            borderLeft: '3px solid var(--color-primary)'
                        }}>
                            {ev.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleView;
