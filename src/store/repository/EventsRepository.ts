import { Event } from '@/entities/event/model/types';

export interface EventsRepository {
    load(): Event[];
    save(events: Event[]): void;
}