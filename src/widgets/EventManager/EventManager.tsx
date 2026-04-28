'use client';
import { useState } from 'react';
import { Plus, CalendarPlus } from 'lucide-react';
import type { Event } from '@/entities/event/model/types';
import type { EventFormValues } from '@/entities/event/model/schema';
import { useEvents } from '@/store/events/useEvents';
import { useEventFilters } from '@/features/event-filters/model/useEventFilters';
import { usePagination } from '@/features/event-pagination/model/usePagination';
import { EventFilters } from '@/features/event-filters/ui/EventFilters';
import { EventForm } from '@/features/event-form/ui/EventForm';
import { ExportButton } from '@/features/event-export/ui/ExportButton';
import { Pagination } from '@/features/event-pagination/ui/Pagination';
import { DeleteConfirmDialog } from '@/features/event-delete/ui/DeleteConfirmDialog';
import { EventCard } from '@/entities/event/ui/EventCard/EventCard';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import { useToast } from '@/shared/ui/Toast/Toast';
import { Hero } from '@/widgets/Hero/Hero';
import { PAGE_SIZE } from '@/shared/config/constants';
import styles from './EventManager.module.css';

interface EventManagerProps {
    onlyFavorites?: boolean;
}

export const EventManager = ({ onlyFavorites = false }: EventManagerProps) => {
    const { events, isHydrated, create, update, remove, toggleFavorite } = useEvents();
    const { show } = useToast();
    const visible = onlyFavorites ? events.filter((e) => e.isFavorite) : events;
    const { filters, setFilters, filtered } = useEventFilters(visible);
    const { page, setPage, totalPages, pageItems } = usePagination(filtered, PAGE_SIZE);

    const [editing, setEditing] = useState<Event | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [toDelete, setToDelete] = useState<Event | null>(null);


    const handleSubmit = (values: EventFormValues) => {
        const dateIso = new Date(values.date).toISOString();
        const payload = {
            title: values.title,
            description: values.description || undefined,
            date: dateIso,
            category: values.category,
            status: values.status,
        };

        if (editing) {
            update({ ...editing, ...payload });
            show('Мероприятие обновлено');
            setEditing(null);
        } else {
            create(payload);
            show('Мероприятие создано');
            setIsCreating(false);
        }
    };

    const confirmDelete = () => {
        if (!toDelete) return;
        remove(toDelete.id);
        show('Мероприятие удалено');
        setToDelete(null);
    };

    if (!isHydrated) {
        return (
            <div className={styles.skeleton}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={styles.skeletonCard} />
                ))}
            </div>
        );
    }

    const isEmpty = events.length === 0;
    const isFiltered = !isEmpty && pageItems.length === 0;

    return (
        <section className={styles.container}>
            <Hero
                title={onlyFavorites ? 'Избранное' : 'Все мероприятия'}
                subtitle={
                    onlyFavorites
                        ? 'Мероприятия, которые вы отметили звёздочкой'
                        : 'Управляйте своими конференциями, вебинарами и встречами'
                }
                scope={onlyFavorites ? 'favorites' : 'all'}
            />

            <div className={styles.toolbar}>
                <EventFilters filters={filters} onChange={setFilters} />
                <div className={styles.toolbarActions}>
                    <ExportButton events={events} />
                    <Button
                        onClick={() => setIsCreating(true)}
                        leftIcon={<Plus size={16} strokeWidth={2.5} />}
                    >
                        Добавить
                    </Button>
                </div>
            </div>

            {isEmpty ? (
                <EmptyState
                    title={onlyFavorites ? 'Нет избранных' : 'Здесь пока пусто'}
                    description={
                        onlyFavorites
                            ? 'Отметьте мероприятие звёздочкой, чтобы оно появилось здесь'
                            : 'Создайте первое мероприятие, чтобы начать'
                    }
                    showCta={!onlyFavorites}
                    onCta={() => setIsCreating(true)}
                />
            ) : isFiltered ? (
                <EmptyState
                    title="Ничего не найдено"
                    description="Попробуйте изменить параметры фильтров или поиска"
                />
            ) : (
                <div className={styles.grid}>
                    {pageItems.map((e, idx) => (
                        <EventCard
                            key={e.id}
                            event={e}
                            index={idx}
                            onEdit={setEditing}
                            onDelete={setToDelete}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />

            <Modal
                isOpen={isCreating}
                onClose={() => setIsCreating(false)}
                title="Новое мероприятие"
            >
                <EventForm onSubmit={handleSubmit} onCancel={() => setIsCreating(false)} />
            </Modal>

            <Modal
                isOpen={!!editing}
                onClose={() => setEditing(null)}
                title="Редактировать мероприятие"
            >
                {editing && (
                    <EventForm
                        initialValue={editing}
                        onSubmit={handleSubmit}
                        onCancel={() => setEditing(null)}
                    />
                )}
            </Modal>

            <DeleteConfirmDialog
                isOpen={!!toDelete}
                message={
                    <>
                        Вы уверены, что хотите удалить{' '}
                        <strong>«{toDelete?.title}»</strong>?
                    </>
                }
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </section>
    );
};

interface EmptyStateProps {
    title: string;
    description: string;
    showCta?: boolean;
    onCta?: () => void;
}

const EmptyState = ({ title, description, showCta, onCta }: EmptyStateProps) => (
    <div className={styles.empty}>
        <div className={styles.emptyIcon} aria-hidden="true">
            <CalendarPlus size={28} strokeWidth={1.5} />
        </div>
        <h3 className={styles.emptyTitle}>{title}</h3>
        <p className={styles.emptyDescription}>{description}</p>
        {showCta && onCta && (
            <Button onClick={onCta} leftIcon={<Plus size={16} strokeWidth={2.5} />}>
                Создать мероприятие
            </Button>
        )}
    </div>
);