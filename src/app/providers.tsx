'use client';
import { ReactNode } from 'react';
import { EventsProvider } from '@/store/events/EventsContext';
import { ToastProvider } from '@/shared/ui/Toast/Toast';

export const Providers = ({ children }: { children: ReactNode }) => (
    <EventsProvider>
        <ToastProvider>{children}</ToastProvider>
    </EventsProvider>
);