'use client';
import { useMemo, useState } from 'react';
import { Event, EventCategory, EventStatus } from '@/entities/event/model/types';

type SortBy = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';

export interface FiltersState {
    search: string;
    category: EventCategory | 'all';
    status: EventStatus | 'all';
    sortBy: SortBy;
}

const initial: FiltersState = { search: '', category: 'all', status: 'all', sortBy: 'date-asc' };

export const useEventFilters = (events: Event[]) => {
    const [filters, setFilters] = useState<FiltersState>(initial);

    const filtered = useMemo(() => {
        const q = filters.search.trim().toLowerCase();
        let result = events.filter((e) => {
            if (filters.category !== 'all' && e.category !== filters.category) return false;
            if (filters.status !== 'all' && e.status !== filters.status) return false;
            if (q && !e.title.toLowerCase().includes(q) && !(e.description ?? '').toLowerCase().includes(q))
                return false;
            return true;
        });

        result = [...result].sort((a, b) => {
            switch (filters.sortBy) {
                case 'date-asc':   return a.date.localeCompare(b.date);
                case 'date-desc':  return b.date.localeCompare(a.date);
                case 'title-asc':  return a.title.localeCompare(b.title, 'ru');
                case 'title-desc': return b.title.localeCompare(a.title, 'ru');
            }
        });
        return result;
    }, [events, filters]);

    return { filters, setFilters, filtered, reset: () => setFilters(initial) };
};