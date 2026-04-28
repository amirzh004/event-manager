import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            leftIcon,
            rightIcon,
            className = '',
            children,
            ...rest
        },
        ref,
    ) => (
        <button
            ref={ref}
            className={[
                styles.button,
                styles[variant],
                styles[`size_${size}`],
                fullWidth ? styles.fullWidth : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...rest}
        >
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </button>
    ),
);
Button.displayName = 'Button';