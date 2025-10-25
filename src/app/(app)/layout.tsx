'use client';

import { MainNav } from '@/components/main-nav';
import { BackgroundSparkles } from '@/components/background-sparkles';
import { MusicPlayer } from '@/components/music-player';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { MusicProvider } from '@/contexts/music-provider';
import { Heart, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FloatingHearts } from '@/components/floating-hearts';
import { ClickHearts } from '@/components/click-hearts';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <MusicProvider>
      <div className="relative min-h-screen w-full">
        <BackgroundSparkles />
        <FloatingHearts />
        <ClickHearts />
        <SidebarProvider>
          <div className="md:flex">
            <Sidebar className="z-20">
              <SidebarHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Heart className="w-6 h-6 text-primary" />
                   <h1 className="font-headline text-xl font-semibold text-accent">Eternal Echoes</h1>
                </div>
                <SidebarTrigger className="md:hidden">
                  <Menu />
                </SidebarTrigger>
              </SidebarHeader>
              <MainNav />
            </Sidebar>
            <main className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ filter: 'blur(4px)', opacity: 0 }}
                    animate={{ filter: 'blur(0px)', opacity: 1 }}
                    exit={{ filter: 'blur(4px)', opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-4 md:p-8">
                      {children}
                    </div>
                  </motion.div>
                </AnimatePresence>
            </main>
          </div>
        </SidebarProvider>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}
