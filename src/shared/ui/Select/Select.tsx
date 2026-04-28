import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.css';

interface Option { value: string; label: string; }
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: readonly Option[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, ...rest }, ref) => (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <select ref={ref} className={[styles.select, error ? styles.invalid : ''].join(' ')} {...rest}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            {error && <span className={styles.error}>{error}</span>}
        </label>
    ),
);
Select.displayName = 'Select';