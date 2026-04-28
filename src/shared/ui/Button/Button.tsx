import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', fullWidth = false, className = '', ...rest }, ref) => (
        <button
            ref={ref}
            className={[
                styles.button,
                styles[variant],
                fullWidth ? styles.fullWidth : '',
                className,
            ].join(' ')}
            {...rest}
        />
    ),
);
Button.displayName = 'Button';