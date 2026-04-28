'use client';
import {Search} from 'lucide-react';
import type {FiltersState} from '../model/useEventFilters';
import {Input} from '@/shared/ui/Input/Input';
import {Select} from '@/shared/ui/Select/Select';
import {Button} from '@/shared/ui/Button/Button';
import {CATEGORY_LABELS, STATUS_LABELS} from '@/entities/event/model/constants';
import {EVENT_CATEGORIES, EVENT_STATUSES} from '@/entities/event/model/types';
import styles from './EventFilters.module.css';

interface EventFiltersProps {
    filters: FiltersState;
    onChange: (filters: FiltersState) => void;
}

const categoryOptions = [
    {value: 'all', label: 'Все категории'},
    ...EVENT_CATEGORIES.map((v) => ({value: v, label: CATEGORY_LABELS[v]})),
];
const statusOptions = [
    {value: 'all', label: 'Все статусы'},
    ...EVENT_STATUSES.map((v) => ({value: v, label: STATUS_LABELS[v]})),
];
const sortOptions = [
    {value: 'date-asc', label: 'Дата ↑'},
    {value: 'date-desc', label: 'Дата ↓'},
    {value: 'title-asc', label: 'А → Я'},
    {value: 'title-desc', label: 'Я → А'},
];

export const EventFilters = ({filters, onChange}: EventFiltersProps) => {
    const update = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) =>
        onChange({...filters, [key]: value});

    const reset = () =>
        onChange({search: '', category: 'all', status: 'all', sortBy: 'date-asc'});

    const isDirty =
        filters.search !== '' ||
        filters.category !== 'all' ||
        filters.status !== 'all' ||
        filters.sortBy !== 'date-asc';

    return (
        <div className={styles.container}>
            <div className={styles.searchRow}>
                <span className={styles.searchIcon}>
                    <Search size={16}/>
                </span>
                <Input
                    className={styles.searchInput}
                    placeholder="Поиск по названию или описанию"
                    value={filters.search}
                    onChange={(e) => update('search', e.target.value)}
                />
            </div>
            <div className={styles.selectsRow}>
                <Select
                    options={categoryOptions}
                    value={filters.category}
                    onChange={(e) => update('category', e.target.value as FiltersState['category'])}
                    aria-label="Категория"
                />
                <Select
                    options={statusOptions}
                    value={filters.status}
                    onChange={(e) => update('status', e.target.value as FiltersState['status'])}
                    aria-label="Статус"
                />
                <Select
                    options={sortOptions}
                    value={filters.sortBy}
                    onChange={(e) => update('sortBy', e.target.value as FiltersState['sortBy'])}
                    aria-label="Сортировка"
                />
                {isDirty && (
                    <Button variant="ghost" size="sm" onClick={reset} className={styles.reset}>
                        Сбросить
                    </Button>
                )}
            </div>
        </div>
    );
};