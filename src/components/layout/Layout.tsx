import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AIChatbot } from '@/components/chatbot/AIChatbot';

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 108;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerHeight),
            behavior: 'smooth',
          });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const timer1 = setTimeout(scrollToHash, 100);
        const timer2 = setTimeout(scrollToHash, 300);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F0E8] text-stone-900 selection:bg-amber-500/20 selection:text-amber-950 font-sans antialiased">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
