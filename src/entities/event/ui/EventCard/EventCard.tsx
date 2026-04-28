'use client';
import { Star, Pencil, Trash2 } from 'lucide-react';
import type { Event } from '../model/types';
import { CATEGORY_LABELS, STATUS_LABELS } from '../model/constants';
import { formatEventDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button/Button';
import styles from './EventCard.module.css';

interface EventCardProps {
    event: Event;
    index?: number;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
    onToggleFavorite: (id: string) => void;
}

export const EventCard = ({
                              event,
                              index = 0,
                              onEdit,
                              onDelete,
                              onToggleFavorite,
                          }: EventCardProps) => (
    <article
        className={`${styles.card} ${styles[`category_${event.category}`]}`}
        style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
        <button
            className={`${styles.fav} ${event.isFavorite ? styles.favActive : ''}`}
            onClick={() => onToggleFavorite(event.id)}
            aria-label={event.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            aria-pressed={event.isFavorite}
        >
            <Star size={16} strokeWidth={2} fill={event.isFavorite ? 'currentColor' : 'none'} />
        </button>

        <div className={styles.body}>
            <span className={styles.category}>{CATEGORY_LABELS[event.category]}</span>
            <h3 className={styles.title}>{event.title}</h3>
            {event.description && <p className={styles.description}>{event.description}</p>}
        </div>

        <div className={styles.footer}>
            <div className={styles.meta}>
                <time className={`${styles.date} tabular`}>{formatEventDate(event.date)}</time>
                <span className={`${styles.status} ${styles[`status_${event.status}`]}`}>
          <span className={styles.statusDot} aria-hidden="true" />
                    {STATUS_LABELS[event.status]}
        </span>
            </div>
            <div className={styles.actions}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(event)}
                    aria-label="Редактировать"
                    leftIcon={<Pencil size={14} />}
                >
                    Изменить
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(event)}
                    aria-label="Удалить"
                    className={styles.deleteBtn}
                    leftIcon={<Trash2 size={14} />}
                >
                    Удалить
                </Button>
            </div>
        </div>
    </article>
);