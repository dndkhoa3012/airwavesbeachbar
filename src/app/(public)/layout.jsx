"use client";

import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ChatWidget from '@/components/public/ChatWidget';
import ScrollToTop from '@/components/public/ScrollToTop';
import { usePathname } from 'next/navigation';

export default function PublicLayout({ children }) {
    const pathname = usePathname();
    const isCollectionView = pathname?.startsWith('/collection/view');

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
            {!isCollectionView && <Header />}
            <main className="flex-grow">
                {children}
            </main>
            {!isCollectionView && <Footer />}
            {!isCollectionView && <ScrollToTop />}
            {!isCollectionView && <ChatWidget />}
        </div>
    );
}
