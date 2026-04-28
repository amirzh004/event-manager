import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...rest }, ref) => (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <input
                ref={ref}
                id={id}
                className={[styles.input, error ? styles.invalid : '', className]
                    .filter(Boolean)
                    .join(' ')}
                aria-invalid={!!error}
                {...rest}
            />
            {error && <span className={styles.error}>{error}</span>}
        </label>
    ),
);
Input.displayName = 'Input';