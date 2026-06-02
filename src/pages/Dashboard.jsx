import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import MatchCard from '../components/MatchCard';
import TaskManager from '../components/TaskManager';
import Flashcard from '../components/Flashcard';
import QuizMode from '../components/QuizMode';
import NoteSummarizer from '../components/NoteSummarizer';
import { Users, Bell, Layers, HelpCircle, ArrowLeft, CheckCircle, FileText } from 'lucide-react';

const allFlashcards = [
    // Math
    { category: 'Math', question: "Derivative of x^2?", answer: "2x" },
    { category: 'Math', question: "Integral of 1/x?", answer: "ln(x)" },
    { category: 'Math', question: "Pythagorean Theorem?", answer: "a² + b² = c²" },
    { category: 'Math', question: "Value of Pi (2 dp)?", answer: "3.14" },
    { category: 'Math', question: "Sin(90°)?", answer: "1" },
    { category: 'Math', question: "Cos(0°)?", answer: "1" },
    { category: 'Math', question: "Derivative of e^x?", answer: "e^x" },
    { category: 'Math', question: "Square root of 144?", answer: "12" },
    { category: 'Math', question: "Quadratic Formula?", answer: "-b ± √(b²-4ac) / 2a" },
    { category: 'Math', question: "Log(1)?", answer: "0" },

    // Physics
    { category: 'Physics', question: "Speed of light?", answer: "3x10⁸ m/s" },
    { category: 'Physics', question: "Newton's 2nd Law?", answer: "F = ma" },
    { category: 'Physics', question: "Unit of Force?", answer: "Newton (N)" },
    { category: 'Physics', question: "Acceleration due to gravity?", answer: "9.8 m/s²" },
    { category: 'Physics', question: "Ohm's Law?", answer: "V = IR" },
    { category: 'Physics', question: "Unit of Power?", answer: "Watt (W)" },
    { category: 'Physics', question: "Kinetic Energy formula?", answer: "½mv²" },
    { category: 'Physics', question: "Potential Energy formula?", answer: "mgh" },
    { category: 'Physics', question: "First Law of Thermodynamics?", answer: "Energy conservation" },
    { category: 'Physics', question: "Charge of an electron?", answer: "-1.6x10⁻¹⁹ C" },

    // Chemistry
    { category: 'Chemistry', question: "Atomic number of Carbon?", answer: "6" },
    { category: 'Chemistry', question: "Symbol for Gold?", answer: "Au" },
    { category: 'Chemistry', question: "pH of pure water?", answer: "7" },
    { category: 'Chemistry', question: "Avogadro's constant?", answer: "6.022x10²³" },
    { category: 'Chemistry', question: "Formula for Table Salt?", answer: "NaCl" },
    { category: 'Chemistry', question: "Bond angle in Water?", answer: "104.5°" },
    { category: 'Chemistry', question: "Most abundant gas in air?", answer: "Nitrogen" },
    { category: 'Chemistry', question: "Process plants use to make food?", answer: "Photosynthesis" },
    { category: 'Chemistry', question: "Chemical formula for Glucose?", answer: "C₆H₁₂O₆" },
    { category: 'Chemistry', question: "Symbol for Iron?", answer: "Fe" },

    // Biology
    { category: 'Biology', question: "Powerhouse of the cell?", answer: "Mitochondria" },
    { category: 'Biology', question: "DNA stands for?", answer: "Deoxyribonucleic Acid" },
    { category: 'Biology', question: "Number of chromosomes in humans?", answer: "46" },
    { category: 'Biology', question: "Largest organ in human body?", answer: "Skin" },
    { category: 'Biology', question: "Universal donor blood type?", answer: "O Negative" },
    { category: 'Biology', question: "Process of cell division?", answer: "Mitosis" },
    { category: 'Biology', question: "Molecule that carries oxygen?", answer: "Hemoglobin" },
    { category: 'Biology', question: "Building blocks of proteins?", answer: "Amino Acids" },
    { category: 'Biology', question: "Basic unit of life?", answer: "Cell" },
    { category: 'Biology', question: "Which organ filters blood?", answer: "Kidney" },

    // History & Lit
    { category: 'History', question: "Who wrote Romeo and Juliet?", answer: "Shakespeare" },
    { category: 'History', question: "Start of WWI?", answer: "1914" },
    { category: 'History', question: "First US President?", answer: "George Washington" },
    { category: 'History', question: "Author of 1984?", answer: "George Orwell" },
    { category: 'History', question: "Ancient Egyptian writing?", answer: "Hieroglyphs" },
    { category: 'History', question: "Empire ruled by Caesar?", answer: "Roman Empire" },
    { category: 'History', question: "Who painted Mona Lisa?", answer: "Da Vinci" },
    { category: 'History', question: "Capital of France?", answer: "Paris" },
    { category: 'History', question: "Longest river in the world?", answer: "Nile" },
    { category: 'History', question: "Year of Moon Landing?", answer: "1969" },

    // Computer Science
    { category: 'Computer Science', question: "CPU stands for?", answer: "Central Processing Unit" },
    { category: 'Computer Science', question: "RAM stands for?", answer: "Random Access Memory" },
    { category: 'Computer Science', question: "Language of the web?", answer: "HTML" },
    { category: 'Computer Science', question: "Binary for 5?", answer: "101" },
    { category: 'Computer Science', question: "Father of Computing?", answer: "Alan Turing" },
    { category: 'Computer Science', question: "What acts as a server?", answer: "Backend" },
    { category: 'Computer Science', question: "HTTP stands for?", answer: "HyperText Transfer Protocol" },
    { category: 'Computer Science', question: "8 bits make a?", answer: "Byte" },
    { category: 'Computer Science', question: "First computer programmer?", answer: "Ada Lovelace" },
    { category: 'Computer Science', question: "Founder of Microsoft?", answer: "Bill Gates" }
];

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState('');
    const [saving, setSaving] = useState(false);
    const [activeView, setActiveView] = useState('home'); // 'home', 'partners', 'tasks', 'flashcards', 'practice'
    const [dailyFlashcards, setDailyFlashcards] = useState([]);
    const [userStats, setUserStats] = useState(null); // { strength: 'Math', weakness: 'History' }
    const [realPartners, setRealPartners] = useState([]);
    const [partnerSearch, setPartnerSearch] = useState('');
    const [partnerFilter, setPartnerFilter] = useState('all'); // 'all', 'strength', 'weakness', 'best'
    const [userStreak, setUserStreak] = useState(0);

    useEffect(() => {
        if (activeView === 'flashcards') {
            // Shuffle and pick 3 random cards each time the view is opened
            const shuffled = [...allFlashcards].sort(() => 0.5 - Math.random());
            setDailyFlashcards(shuffled.slice(0, 3));
        }
    }, [activeView]);
    useEffect(() => {
        const initDashboard = async () => {
            if (!user) return;
            try {
                setUser(user);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setProfile(data);
                    if (data.strength && data.weakness) {
                        setUserStats({ strength: data.strength, weakness: data.weakness });
                    }
                    if (data.streak) {
                        setUserStreak(data.streak);
                    }
                } else if (user.user_metadata?.full_name) {
                    // Profile missing but metadata exists (from signup). Auto-create profile.
                    console.log("Auto-creating profile from metadata...");
                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert([
                            { id: user.id, full_name: user.user_metadata.full_name, updated_at: new Date() }
                        ]);

                    if (!insertError) {
                        setProfile({ full_name: user.user_metadata.full_name });
                    } else {
                        console.error("Error auto-creating profile:", insertError);
                    }
                }
            } catch (error) {
                console.error("Error initializing dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            initDashboard();
        } else {
            // Initial check for user if passed from prop or context, though here we rely on supabase.auth listener in App usually. 
            // Since we set user via prop or checking auth, let's do a quick check:
            supabase.auth.getUser().then(({ data }) => {
                if (data.user) {
                    setUser(data.user);
                    // allow the next render or effect run to pick it up, or call init here
                } else {
                    setLoading(false);
                }
            });
        }
    }, [user]);

    // Fetch real partners on load
    useEffect(() => {
        const fetchPartners = async () => {
            if (!user) return;

            const { data } = await supabase
                .from('profiles')
                .select('*')
                // .neq('id', user.id) // Removed to show self
                .not('strength', 'is', null) // Only fetch users who have taken the quiz
                .limit(10);

            if (data) {
                // Formatting real data to match our card component structure
                const formatted = data.map(p => ({
                    name: p.full_name + (p.id === user.id ? ' (You)' : ''),
                    role: p.major || 'Student',
                    strengths: [p.strength],
                    weaknesses: [p.weakness],
                    matchScore: 0, // Will be calculated
                    isReal: true, // Flag to identify real users
                    isMe: p.id === user.id
                }));
                setRealPartners(formatted);
            }
        };
        fetchPartners();
    }, [user]);

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .insert([
                    { id: user.id, full_name: fullName, updated_at: new Date() }
                ]);

            if (error) throw error;

            // Refresh profile
            setProfile({ full_name: fullName });
        } catch (error) {
            alert('Error creating profile: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const mockMatches = [
        { name: 'Sarah J.', role: 'Physics Expert', strengths: ['Physics', 'Calc'], weaknesses: ['History'], matchScore: 95 },
        { name: 'Mike T.', role: 'History Buff', strengths: ['History', 'Lit'], weaknesses: ['Maths'], matchScore: 88 },
        { name: 'Jessica L.', role: 'Biologist', strengths: ['Biology', 'Chem'], weaknesses: ['Physics'], matchScore: 92 },
        { name: 'David R.', role: 'CompSci Wiz', strengths: ['Computer Science', 'Math'], weaknesses: ['Lit'], matchScore: 90 },
        { name: 'Emily W.', role: 'Literature Lover', strengths: ['History', 'Lit'], weaknesses: ['Chem'], matchScore: 85 },
    ];

    // Combine Real + Mock (Real first)
    const allPotentialMatches = [...realPartners, ...mockMatches];

    const handleQuizComplete = async (stats) => {
        // Use passed stats if valid
        let newStats = stats;
        if (!newStats) {
            newStats = { strength: 'Check Analysis', weakness: 'None' };
        }

        setUserStats(newStats);

        // Streak Logic: >= 60% (e.g. 3/5) correct = +1 Streak. Else Reset.
        let newStreak = userStreak;
        if (newStats.score !== undefined && newStats.total > 0) {
            const percentage = newStats.score / newStats.total;
            if (percentage >= 0.6) {
                newStreak += 1;
            } else {
                newStreak = 0;
            }
            setUserStreak(newStreak);
        }

        setActiveView('partners');

        // Save to Database
        if (user) {
            try {
                await supabase.from('profiles').update({
                    strength: newStats.strength,
                    weakness: newStats.weakness,
                    streak: newStreak,
                    updated_at: new Date()
                }).eq('id', user.id);
            } catch (err) { console.error(err); }
        }
    };

    // Filter matches based on userStats if available
    let displayedMatches = [];
    if (userStats) {

        // Calculate dynamic scores for real partners based on compatibility
        const scoredMatches = allPotentialMatches.map(m => {
            let score = m.matchScore || 70; // Default base

            // Logic: High score if they are strong in your weakness
            if (m.strengths.includes(userStats.weakness)) score += 20;
            // Logic: Bonus if they are weak in your strength (reciprocal learning)
            if (m.weaknesses.includes(userStats.strength)) score += 10;

            // Cap at 99
            if (score > 99) score = 99;

            // Self match handling:
            // "Normal" unless exceptional (No weakness found = Balanced/Top Tier)
            if (m.isMe) {
                if (m.weaknesses.includes('None')) {
                    score = 99; // Top Rated
                } else {
                    score = 75; // Average/Normal
                }
            }

            return { ...m, matchScore: score };
        });

        // Search and Filter Logic
        let filtered = scoredMatches;

        if (partnerSearch) {
            const searchLower = partnerSearch.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchLower) ||
                m.role.toLowerCase().includes(searchLower) ||
                m.strengths.some(s => s.toLowerCase().includes(searchLower)) ||
                m.weaknesses.some(w => w.toLowerCase().includes(searchLower))
            );
        }

        if (partnerFilter === 'best') {
            filtered = filtered.sort((a, b) => b.matchScore - a.matchScore);
        } else if (userStats.weakness !== 'None' && partnerFilter === 'all') {
            // Default smart filter (if not searching specifically)
            if (!partnerSearch) {
                filtered = filtered.filter(m =>
                    m.strengths.includes(userStats.weakness) ||
                    m.weaknesses.includes(userStats.strength) ||
                    m.isReal
                ).sort((a, b) => b.matchScore - a.matchScore);
            }
        }

        // Apply final slice only if not searching (show all results if searching)
        displayedMatches = partnerSearch || partnerFilter === 'best' ? filtered : filtered.slice(0, 5);

        // Ensure at least some matches if list is empty after "smart" filter but no search
        if (displayedMatches.length === 0 && !partnerSearch) {
            displayedMatches = scoredMatches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
        }
    }

    // fallback
    const finalMatches = displayedMatches.length > 0 ? displayedMatches : mockMatches.slice(0, 3);



    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading...</div>;
    }

    if (!profile) {
        // ... (existing profile creation logic)
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', position: 'relative' }}>

                {/* Header for Setup Screen */}


                <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', maxWidth: '400px', width: '90%', margin: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Complete your Profile</h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Tell us your name to get started.</p>
                    <form onSubmit={handleCreateProfile}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Alex Smith"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                required
                            />
                        </div>
                        <button disabled={saving} style={{ width: '100%', padding: '0.8rem', background: 'var(--color-primary)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                            {saving ? 'Saving...' : 'Get Started'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }



    return (
        <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-out', position: 'relative' }}>

            {/* Blocking Recovery Modal - REMOVED (Handled above) */}

            <header style={{ marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    {activeView === 'home' ? (
                        <>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '700' }}>Welcome back, <span style={{ color: 'var(--color-primary)' }}>{profile?.full_name?.split(' ')[0] || 'Student'}</span>👋</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>Choose an activity to get started.</p>
                                {userStreak > 0 && (
                                    <div style={{
                                        background: 'rgba(245, 158, 11, 0.15)',
                                        color: '#f59e0b',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: 'var(--radius-full)',
                                        fontWeight: '700',
                                        fontSize: '0.8rem',
                                        border: '1px solid rgba(245, 158, 11, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        🔥 {userStreak} Streak
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => setActiveView('home')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <ArrowLeft size={24} />
                            </button>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', textTransform: 'capitalize' }}>{activeView.replace('-', ' ')}</h1>
                        </div>
                    )}
                </div>
            </header>


            {/* HOME GRID VIEW */}
            {activeView === 'home' && (
                <div className="dashboard-grid">
                    <DashboardCard
                        title="Study Partners"
                        description={userStats ? "New matches found based on your quiz!" : "Complete a quiz to unlock matches"}
                        icon={<Users size={40} />}
                        color="var(--color-primary)"
                        onClick={() => setActiveView('partners')}
                    />
                    <DashboardCard
                        title="Daily Tasks"
                        description="Get notified to stay on schedule"
                        icon={<Bell size={40} />}
                        color="#f59e0b"
                        onClick={() => setActiveView('tasks')}
                    />
                    <DashboardCard
                        title="Flashcards"
                        description="Review flashcards and summaries"
                        icon={<Layers size={40} />}
                        color="var(--color-secondary)"
                        onClick={() => setActiveView('flashcards')}
                    />
                    <DashboardCard
                        title="AI Summarizer"
                        description="Turn long notes into quick summaries"
                        icon={<FileText size={40} />}
                        color="#3b82f6" // Blue
                        onClick={() => setActiveView('summarizer')}
                    />
                    <DashboardCard
                        title="Practice Questions"
                        description="Answer questions to boost your progress"
                        icon={<HelpCircle size={40} />}
                        color="#10b981"
                        onClick={() => setActiveView('practice')}
                    />
                </div>
            )}

            {/* PARTNERS VIEW */}
            {activeView === 'partners' && (
                <div className="animate-fade-in">
                    {!userStats ? (
                        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                            <HelpCircle size={60} style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', opacity: 0.5 }} />
                            <h2 style={{ marginBottom: '1rem' }}>Partners Locked</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                                We need to know your strengths and weaknesses first.<br />
                                Complete a Practice Quiz to find your perfect study match.
                            </p>
                            <button
                                onClick={() => setActiveView('practice')}
                                style={{
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: 'none',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Take a Quiz Now
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CheckCircle size={24} color="#10b981" />
                                <div>
                                    <strong>Analysis Complete:</strong>
                                    {userStats.weakness === 'None' ? (
                                        <span> You have a balanced profile! <br />Here are some of the <strong>best users</strong> to study with.</span>
                                    ) : (
                                        <span> You are strong in <span style={{ color: '#10b981' }}>{userStats.strength}</span> but could use help with <span style={{ color: '#ef4444' }}>{userStats.weakness}</span>.
                                            <br />Here are matches based on your profile.</span>
                                    )}
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div style={{ marginBottom: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Search by name, subject (e.g. Physics)..."
                                        value={partnerSearch}
                                        onChange={(e) => setPartnerSearch(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', paddingLeft: '3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                    />
                                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}><Users size={18} /></div>
                                </div>
                                <button
                                    onClick={() => setPartnerFilter(partnerFilter === 'best' ? 'all' : 'best')}
                                    style={{
                                        background: partnerFilter === 'best' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'white',
                                        padding: '0 1.5rem',
                                        borderRadius: 'var(--radius-full)',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    {partnerFilter === 'best' ? 'Showing Best' : 'Show Top Rated'}
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
                                {finalMatches.map((m, i) => <MatchCard key={i} {...m} />)}
                            </div>
                            {finalMatches.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                                    No partners found matching your search.
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}


            {/* TASKS VIEW */}
            {activeView === 'tasks' && (
                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <TaskManager userId={user.id} />
                </div>
            )}

            {/* FLASHCARDS VIEW */}
            {activeView === 'flashcards' && (
                <div className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
                        {dailyFlashcards.map((card, index) => (
                            <Flashcard key={index} question={card.question} answer={card.answer} />
                        ))}
                    </div>
                </div>
            )}

            {/* PRACTICE VIEW */}
            {activeView === 'practice' && (
                <div className="animate-fade-in">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Practice Quiz</h2>
                    <QuizMode
                        allQuestions={allFlashcards}
                        onComplete={handleQuizComplete}
                        currentStreak={userStreak}
                    />
                </div>
            )}

            {/* SUMMARIZER VIEW */}
            {activeView === 'summarizer' && (
                <div className="animate-fade-in">
                    <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Note Summarizer</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>Paste your study notes below to get key takeaways.</p>
                    </header>
                    <NoteSummarizer />
                </div>
            )}
        </div>
    );
};

const DashboardCard = ({ title, description, icon, color, onClick }) => (
    <div
        className="dashboard-card"
        onClick={onClick}
        style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            // Padding handled by CSS class for mobile
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            // gap handled by CSS class
            backdropFilter: 'blur(10px)'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = color;
            e.currentTarget.style.boxShadow = `0 10px 30px -10px ${color}40`;
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{
            color: color,
            background: `${color}15`,
            padding: '1.5rem',
            borderRadius: '50%',
            marginBottom: '0.5rem'
        }}>
            {icon}
        </div>
        <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{description}</p>
        </div>
        <div style={{
            marginTop: 'auto',
            fontWeight: '600',
            color: color,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }}>
            Open Feature
        </div>
    </div>
);

export default Dashboard;
