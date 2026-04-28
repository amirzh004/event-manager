import { format, parseISO } from 'date-fns';

export const formatEventDate = (iso: string): string =>
    format(parseISO(iso), 'dd.MM.yyyy HH:mm');

export const toDatetimeLocalValue = (iso: string): string => {
    const d = parseISO(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};