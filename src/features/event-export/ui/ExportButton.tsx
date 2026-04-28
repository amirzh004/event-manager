'use client';
import { Event } from '@/entities/event/model/types';
import { Button } from '@/shared/ui/Button/Button';
import {Download} from "lucide-react";

export const ExportButton = ({ events }: { events: Event[] }) => {
    const onExport = () => {
        const blob = new Blob([JSON.stringify({ events }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `events-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return <Button variant="secondary" onClick={onExport} leftIcon={<Download size={16} />}>
        Экспорт
    </Button>;
};