import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Providers } from './providers';
import { AppNav } from '@/widgets/AppNav/AppNav';
import './globals.css';

export const metadata: Metadata = {
    title: 'Event Manager',
    description: 'Manage your events with ease',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={GeistSans.variable}>
        <body>
        <Providers>
            <header className="app-header">
                <div className="app-header__inner">
                    <div className="app-header__brand">
                        <div className="app-header__logo" aria-hidden="true" />
                        <h1 className="app-header__title">Event Manager</h1>
                    </div>
                    <AppNav />
                </div>
            </header>
            <main className="app-main">{children}</main>
        </Providers>
        </body>
        </html>
    );
}