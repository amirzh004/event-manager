import { Event } from '@/entities/event/model/types';
import { EventsAction } from './eventsActions';

export interface EventsState {
    events: Event[];
    isHydrated: boolean;
}

export const initialEventsState: EventsState = { events: [], isHydrated: false };

export const eventsReducer = (state: EventsState, action: EventsAction): EventsState => {
    switch (action.type) {
        case 'init':
            return { events: action.payload, isHydrated: true };
        case 'create':
            return { ...state, events: [action.payload, ...state.events] };
        case 'update':
            return {
                ...state,
                events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
            };
        case 'delete':
            return { ...state, events: state.events.filter((e) => e.id !== action.payload.id) };
        case 'toggleFavorite':
            return {
                ...state,
                events: state.events.map((e) =>
                    e.id === action.payload.id ? { ...e, isFavorite: !e.isFavorite } : e,
                ),
            };
        default:
            return state;
    }
};