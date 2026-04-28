'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppNav.module.css';

interface NavLink {
    href: string;
    label: string;
}

const links: NavLink[] = [
    { href: '/', label: 'Все' },
    { href: '/favorites', label: 'Избранное' },
];

export const AppNav = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.nav} aria-label="Основная навигация">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${isActive ? styles.active : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
};