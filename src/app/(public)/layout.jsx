import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ChatWidget from '@/components/public/ChatWidget';

export default function PublicLayout({ children }) {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
}
