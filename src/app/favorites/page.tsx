import type { Metadata } from 'next';
import { EventManager } from '@/widgets/EventManager/EventManager';

export const metadata: Metadata = {
    title: 'Избранное · Event Manager',
};

export default function FavoritesPage() {
    return <EventManager onlyFavorites />;
}