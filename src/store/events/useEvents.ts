'use client';
import { useCallback, useContext } from 'react';
import { EventsContext } from './EventsContext';
import { eventsActions, createEventFromDraft } from './eventsActions';
import { Event, EventDraft } from '@/entities/event/model/types';
import { generateId } from '@/shared/lib/id';

export const useEvents = () => {
    const ctx = useContext(EventsContext);
    if (!ctx) throw new Error('useEvents must be used inside EventsProvider');
    const { state, dispatch } = ctx;

    const create = useCallback(
        (draft: EventDraft) => dispatch(eventsActions.create(createEventFromDraft(draft, generateId()))),
        [dispatch],
    );
    const update = useCallback((event: Event) => dispatch(eventsActions.update(event)), [dispatch]);
    const remove = useCallback((id: string) => dispatch(eventsActions.delete(id)), [dispatch]);
    const toggleFavorite = useCallback(
        (id: string) => dispatch(eventsActions.toggleFavorite(id)),
        [dispatch],
    );

    return {
        events: state.events,
        isHydrated: state.isHydrated,
        create,
        update,
        remove,
        toggleFavorite,
    };
};