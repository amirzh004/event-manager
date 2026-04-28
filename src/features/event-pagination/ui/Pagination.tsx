'use client';
import { useMemo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import styles from './Pagination.module.css';
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const getPageRange = (current: number, total: number): (number | 'ellipsis')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const range: (number | 'ellipsis')[] = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    if (left > 2) range.push('ellipsis');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push('ellipsis');

    range.push(total);
    return range;
};

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
    const range = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <nav className={styles.container} aria-label="Пагинация">
            <Button variant="secondary" size="sm" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Предыдущая">
                <ChevronLeft size={16} />
            </Button>

            <ul className={styles.list}>
                {range.map((item, idx) =>
                    item === 'ellipsis' ? (
                        <li key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
                            …
                        </li>
                    ) : (
                        <li key={item}>
                            <button
                                className={[styles.page, item === page ? styles.active : ''].join(' ')}
                                onClick={() => onChange(item)}
                                aria-current={item === page ? 'page' : undefined}
                            >
                                {item}
                            </button>
                        </li>
                    ),
                )}
            </ul>

            <Button variant="secondary" size="sm" onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Следующая">
                <ChevronRight size={16} />
            </Button>
        </nav>
    );
};