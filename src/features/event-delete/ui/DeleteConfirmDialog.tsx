'use client';
import { ReactNode } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import styles from './DeleteConfirmDialog.module.css';
import {Trash2} from "lucide-react";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteConfirmDialog = ({
                                        isOpen,
                                        title = 'Подтверждение удаления',
                                        message,
                                        confirmLabel = 'Удалить',
                                        cancelLabel = 'Отмена',
                                        onConfirm,
                                        onCancel,
                                    }: DeleteConfirmDialogProps) => (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
            <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
            <Button
                variant="danger"
                onClick={onConfirm}
                leftIcon={<Trash2 size={16} />}
            >
                {confirmLabel}
            </Button>
        </div>
    </Modal>
);