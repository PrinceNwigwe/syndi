import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, CheckCircle, Circle, Loader2 } from 'lucide-react';

const TaskManager = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (userId) fetchTasks();
    }, [userId]);

    const fetchTasks = async () => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('is_complete', { ascending: true }) // Incomplete first
                .order('inserted_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setAdding(true);

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ user_id: userId, title: newTask.trim() }])
                .select()
                .single();

            if (error) throw error;

            setTasks([data, ...tasks]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task');
        } finally {
            setAdding(false);
        }
    };

    const toggleTask = async (task) => {
        // Optimistic update
        const updatedTasks = tasks.map(t =>
            t.id === task.id ? { ...t, is_complete: !t.is_complete } : t
        );
        // Resort: incomplete first
        updatedTasks.sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
        setTasks(updatedTasks);

        try {
            const { error } = await supabase
                .from('tasks')
                .update({ is_complete: !task.is_complete })
                .eq('id', task.id);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating task:', error);
            // Revert on error
            fetchTasks();
        }
    };

    const deleteTask = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        setTasks(tasks.filter(t => t.id !== taskId));

        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting task:', error);
            fetchTasks(); // Revert
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loader2 className="animate-spin" color="var(--color-primary)" />
        </div>;
    }

    return (
        <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--glass-border)',
            padding: 'var(--space-md)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Tasks
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    {tasks.filter(t => !t.is_complete).length} remaining
                </span>
            </h3>

            {/* Add Task Form */}
            <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    style={{
                        flex: 1,
                        padding: '0.6rem 0.8rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'white',
                        fontSize: '0.9rem'
                    }}
                />
                <button
                    type="submit"
                    disabled={adding || !newTask.trim()}
                    style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        width: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: (adding || !newTask.trim()) ? 0.6 : 1
                    }}
                >
                    {adding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                </button>
            </form>

            {/* Task List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tasks.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', padding: '1rem' }}>
                        No tasks yet. Add one above!
                    </p>
                )}

                {tasks.map(task => (
                    <div
                        key={task.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px',
                            background: task.is_complete ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid',
                            borderColor: task.is_complete ? 'transparent' : 'var(--glass-border)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <button
                            onClick={() => toggleTask(task)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                        >
                            {task.is_complete ?
                                <CheckCircle size={20} color="var(--color-secondary)" /> :
                                <Circle size={20} color="var(--color-text-muted)" />
                            }
                        </button>

                        <span style={{
                            flex: 1,
                            textDecoration: task.is_complete ? 'line-through' : 'none',
                            color: task.is_complete ? 'var(--color-text-muted)' : 'white',
                            fontSize: '0.95rem'
                        }}>
                            {task.title}
                        </span>

                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                opacity: 0.5
                            }}
                            onMouseOver={(e) => e.target.style.opacity = 1}
                            onMouseOut={(e) => e.target.style.opacity = 0.5}
                        >
                            <Trash2 size={16} color="#ef4444" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;
