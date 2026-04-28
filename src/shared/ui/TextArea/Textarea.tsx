import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, ...rest }, ref) => (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <textarea
                ref={ref}
                className={[styles.textarea, error ? styles.invalid : ''].join(' ')}
                aria-invalid={!!error}
                {...rest}
            />
            {error && <span className={styles.error}>{error}</span>}
        </label>
    ),
);
Textarea.displayName = 'Textarea';