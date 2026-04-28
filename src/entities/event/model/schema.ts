import { z } from 'zod';
import { EVENT_CATEGORIES, EVENT_STATUSES } from './types';

export const eventFormSchema = z
    .object({
        title: z.string().trim().min(1, 'Название обязательно').max(120, 'Слишком длинное название'),
        description: z.string().trim().max(1000).optional().or(z.literal('')),
        date: z.string().min(1, 'Дата обязательна'),
        category: z.enum(EVENT_CATEGORIES),
        status: z.enum(EVENT_STATUSES),
    })
    .refine(
        (data) => {
            if (data.status === 'Completed') return true;
            return new Date(data.date).getTime() > Date.now();
        },
        { path: ['date'], message: 'Дата не может быть в прошлом для запланированного события' },
    );

export type EventFormValues = z.infer<typeof eventFormSchema>;