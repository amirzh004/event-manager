import { Event } from '@/entities/event/model/types';
import { STORAGE_KEY } from '@/shared/config/constants';
import { EventsRepository } from './EventsRepository';
import { mockEvents } from './mockData';

export class LocalStorageRepository implements EventsRepository {
    load(): Event[] {
        if (typeof window === 'undefined') return mockEvents;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return mockEvents;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? (parsed as Event[]) : mockEvents;
        } catch {
            return mockEvents;
        }
    }
    save(events: Event[]): void {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        } catch (e) {
            console.error('LocalStorage save failed', e);
        }
    }
}