import { Event, EventDraft } from '@/entities/event/model/types';

export type EventsAction =
    | { type: 'init'; payload: Event[] }
    | { type: 'create'; payload: Event }
    | { type: 'update'; payload: Event }
    | { type: 'delete'; payload: { id: string } }
    | { type: 'toggleFavorite'; payload: { id: string } };

export const eventsActions = {
    init: (events: Event[]): EventsAction => ({ type: 'init', payload: events }),
    create: (event: Event): EventsAction => ({ type: 'create', payload: event }),
    update: (event: Event): EventsAction => ({ type: 'update', payload: event }),
    delete: (id: string): EventsAction => ({ type: 'delete', payload: { id } }),
    toggleFavorite: (id: string): EventsAction => ({ type: 'toggleFavorite', payload: { id } }),
};

export const createEventFromDraft = (draft: EventDraft, id: string): Event => ({
    ...draft,
    id,
    isFavorite: false,
});