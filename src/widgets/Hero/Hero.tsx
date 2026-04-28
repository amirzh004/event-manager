'use client';
import { useEvents } from '@/store/events/useEvents';
import { useMemo } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
    title: string;
    subtitle: string;
    scope?: 'all' | 'favorites';
}

export const Hero = ({ title, subtitle, scope = 'all' }: HeroProps) => {
    const { events } = useEvents();

    const stats = useMemo(() => {
        const source = scope === 'favorites' ? events.filter((e) => e.isFavorite) : events;
        return {
            total: source.length,
            planned: source.filter((e) => e.status === 'Planned').length,
            favorites: events.filter((e) => e.isFavorite).length,
        };
    }, [events, scope]);

    return (
        <section className={styles.hero}>
            <div className={styles.text}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.stats}>
                <Stat label="Всего" value={stats.total} />
                <Stat label="Запланировано" value={stats.planned} accent="primary" />
                <Stat label="В избранном" value={stats.favorites} accent="favorite" />
            </div>
        </section>
    );
};

interface StatProps {
    label: string;
    value: number;
    accent?: 'default' | 'primary' | 'favorite';
}

const Stat = ({ label, value, accent = 'default' }: StatProps) => (
    <div className={`${styles.stat} ${styles[`stat_${accent}`]}`}>
        <span className={`${styles.statValue} tabular`}>{value}</span>
        <span className={styles.statLabel}>{label}</span>
    </div>
);