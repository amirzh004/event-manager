'use client';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import styles from './Toast.module.css';

interface ToastItem { id: string; message: string; type: 'error' | 'success'; }
interface ToastContextValue { show: (msg: string, type?: ToastItem['type']) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<ToastItem[]>([]);
    const show = useCallback((message: string, type: ToastItem['type'] = 'success') => {
        const id = Math.random().toString(36).slice(2);
        setItems((s) => [...s, { id, message, type }]);
        setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3500);
    }, []);
    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className={styles.container}>
                {items.map((t) => (
                    <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>{t.message}</div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
};