'use client';

import { MainNav } from '@/components/main-nav';
import { BackgroundSparkles } from '@/components/background-sparkles';
import { MusicPlayer } from '@/components/music-player';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { MusicProvider } from '@/contexts/music-provider';
import { Heart, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FloatingHearts } from '@/components/floating-hearts';
import { ClickHearts } from '@/components/click-hearts';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="md:flex min-h-screen">
      <Sidebar className="z-20 transition-all duration-300 ease-in-out">
        <SidebarHeader className="flex items-center justify-between p-4">
          <motion.div 
            className="flex items-center gap-2 overflow-hidden"
            animate={{ 
              width: isCollapsed && !isMobile ? '40px' : 'auto',
              opacity: isCollapsed && !isMobile ? 0.7 : 1
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heart className="w-6 h-6 text-primary flex-shrink-0 animate-pulse" />
            <motion.h1 
              className="font-headline text-xl font-semibold text-accent whitespace-nowrap"
              animate={{ 
                opacity: isCollapsed && !isMobile ? 0 : 1,
                width: isCollapsed && !isMobile ? 0 : 'auto'
              }}
              transition={{ duration: 0.2 }}
            >
              Eternal Echoes
            </motion.h1>
          </motion.div>
          <SidebarTrigger className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
        </SidebarHeader>
        <MainNav />
      </Sidebar>
      
      <motion.main 
        className="flex-1 relative overflow-hidden"
        animate={{
          marginLeft: isCollapsed && !isMobile ? '0px' : '0px'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ filter: 'blur(4px)', opacity: 0, y: 10 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            exit={{ filter: 'blur(4px)', opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="min-h-screen"
          >
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundSparkles />
        <FloatingHearts />
        <ClickHearts />
        <SidebarProvider>
          <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}