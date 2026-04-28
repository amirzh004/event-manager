'use client';
import { createContext, ReactNode, useEffect, useMemo, useReducer, useRef } from 'react';
import { LocalStorageRepository } from '@/store/repository/LocalStorageRepository';
import { EventsRepository } from '@/store/repository/EventsRepository';
import { eventsReducer, initialEventsState, EventsState } from './eventsReducer';
import { EventsAction, eventsActions } from './eventsActions';

interface EventsContextValue {
    state: EventsState;
    dispatch: React.Dispatch<EventsAction>;
}

export const EventsContext = createContext<EventsContextValue | null>(null);

interface ProviderProps { children: ReactNode; repository?: EventsRepository; }

export const EventsProvider = ({ children, repository }: ProviderProps) => {
    const repoRef = useRef<EventsRepository>(repository ?? new LocalStorageRepository());
    const [state, dispatch] = useReducer(eventsReducer, initialEventsState);

    useEffect(() => {
        dispatch(eventsActions.init(repoRef.current.load()));
    }, []);

    useEffect(() => {
        if (state.isHydrated) repoRef.current.save(state.events);
    }, [state.events, state.isHydrated]);

    const value = useMemo(() => ({ state, dispatch }), [state]);
    return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};