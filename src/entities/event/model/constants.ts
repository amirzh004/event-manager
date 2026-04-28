import { EVENT_CATEGORIES, EVENT_STATUSES } from './types';

export const CATEGORY_LABELS: Record<(typeof EVENT_CATEGORIES)[number], string> = {
    Conference: 'Конференция',
    Webinar: 'Вебинар',
    Meeting: 'Встреча',
};
export const STATUS_LABELS: Record<(typeof EVENT_STATUSES)[number], string> = {
    Planned: 'Запланировано',
    Completed: 'Завершено',
};

export const CATEGORY_OPTIONS = EVENT_CATEGORIES.map((v) => ({ value: v, label: CATEGORY_LABELS[v] }));
export const STATUS_OPTIONS = EVENT_STATUSES.map((v) => ({ value: v, label: STATUS_LABELS[v] }));