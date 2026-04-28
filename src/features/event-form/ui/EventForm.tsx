'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Event } from '@/entities/event/model/types';
import { eventFormSchema, EventFormValues } from '@/entities/event/model/schema';
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '@/entities/event/model/constants';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import { Button } from '@/shared/ui/Button/Button';
import { toDatetimeLocalValue } from '@/shared/lib/date';
import styles from './EventForm.module.css';
import {Textarea} from "@/shared/ui/TextArea/Textarea";
import {Check} from "lucide-react";

interface EventFormProps {
    initialValue?: Event;
    onSubmit: (values: EventFormValues) => void;
    onCancel: () => void;
}

export const EventForm = ({ initialValue, onSubmit, onCancel }: EventFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValue
            ? {
                title: initialValue.title,
                description: initialValue.description ?? '',
                date: toDatetimeLocalValue(initialValue.date),
                category: initialValue.category,
                status: initialValue.status,
            }
            : { title: '', description: '', date: '', category: 'Conference', status: 'Planned' },
    });

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input label="Название *" {...register('title')} error={errors.title?.message} />
            <Textarea label="Описание" rows={3} {...register('description')} error={errors.description?.message} />
            <Input
                label="Дата и время *"
                type="datetime-local"
                {...register('date')}
                error={errors.date?.message}
            />
            <div className={styles.row}>
                <Select label="Категория" options={CATEGORY_OPTIONS} {...register('category')} />
                <Select label="Статус" options={STATUS_OPTIONS} {...register('status')} />
            </div>
            <div className={styles.actions}>
                <Button type="button" variant="secondary" onClick={onCancel}>Отмена</Button>
                <Button type="submit" disabled={isSubmitting} leftIcon={<Check size={16} />}>
                    {initialValue ? 'Сохранить' : 'Создать'}
                </Button>
            </div>
        </form>
    );
};