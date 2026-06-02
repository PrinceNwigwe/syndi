import React, { useState } from 'react';
import { FileText, Upload, Sparkles, Copy, Check } from 'lucide-react';

const NoteSummarizer = () => {
    const [inputText, setInputText] = useState('');
    const [summary, setSummary] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [copied, setCopied] = useState(false);

    // Basic Extractive Summarization Algorithm (Client-Side)
    const generateSummary = () => {
        if (!inputText.trim()) return;

        setIsThinking(true);

        // Simulate "AI Thinking" delay for effect
        setTimeout(() => {
            const sentences = inputText.match(/[^\.!\?]+[\.!\?]+/g) || [inputText];
            const words = inputText.toLowerCase().match(/\b\w+\b/g) || [];

            // 1. Calculate Word Frequency (ignoring common stop words)
            const stopWords = new Set(['the', 'is', 'in', 'and', 'to', 'of', 'a', 'for', 'on', 'with', 'as', 'by', 'at', 'an', 'be', 'this', 'that', 'it', 'from', 'or', 'are', 'was', 'were']);
            const frequency = {};

            words.forEach(word => {
                if (!stopWords.has(word) && word.length > 3) {
                    frequency[word] = (frequency[word] || 0) + 1;
                }
            });

            // 2. Score Sentences
            const sentenceScores = sentences.map((sentence, index) => {
                const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
                let score = 0;
                sentenceWords.forEach(word => {
                    if (frequency[word]) {
                        score += frequency[word];
                    }
                });
                // Boost first sentence as it often contains the main idea
                if (index === 0) score *= 1.2;
                // Penalize very short sentences
                if (sentenceWords.length < 5) score *= 0.5;

                return { text: sentence.trim(), score, index };
            });

            // 3. Pick Top Sentences (Top 30% or at least 3 sentences)
            const threshold = Math.max(3, Math.ceil(sentences.length * 0.3));
            const topSentences = sentenceScores
                .sort((a, b) => b.score - a.score)
                .slice(0, threshold)
                .sort((a, b) => a.index - b.index) // Re-order by appearance
                .map(s => s.text);

            setSummary(topSentences.join(' '));
            setIsThinking(false);
        }, 1500);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setInputText(e.target.result);
            reader.readAsText(file);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '2rem' }}>

            {/* Input Section */}
            <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={20} color="var(--color-primary)" /> Input Notes
                    </h3>
                    <label style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Upload size={16} /> Upload text file
                        <input type="file" accept=".txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                </div>

                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your lecture notes, essay, or article here..."
                    style={{
                        width: '100%',
                        height: '200px',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'white',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                    }}
                />

                <button
                    onClick={generateSummary}
                    disabled={isThinking || !inputText}
                    style={{
                        padding: '1rem',
                        background: isThinking ? 'var(--color-text-muted)' : 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: isThinking ? 'wait' : 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'background 0.3s'
                    }}
                >
                    {isThinking ? (
                        <>Analyzing Key Concepts...</>
                    ) : (
                        <><Sparkles size={20} /> Summarize</>
                    )}
                </button>
            </div>

            {/* Output Section */}
            {summary && (
                <div className="card-glass animate-fade-in" style={{ padding: '2rem', borderTop: '4px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#10b981' }}>Summary Generated</h3>
                        <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <p style={{ lineHeight: '1.8', color: 'var(--color-text-light)', whiteSpace: 'pre-wrap' }}>
                        {summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default NoteSummarizer;
