export const EVENT_CATEGORIES = ['Conference', 'Webinar', 'Meeting'] as const;
export const EVENT_STATUSES = ['Planned', 'Completed'] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
export type EventStatus = (typeof EVENT_STATUSES)[number];

export interface Event {
    id: string;
    title: string;
    description?: string;
    date: string; // ISO
    category: EventCategory;
    status: EventStatus;
    isFavorite: boolean;
}

export type EventDraft = Omit<Event, 'id' | 'isFavorite'>;