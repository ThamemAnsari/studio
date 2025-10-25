'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Image as ImageIcon,
  Calendar,
  Quote,
  BotMessageSquare,
  PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/photos', label: 'Photo Album', icon: ImageIcon },
  { href: '/timeline', label: 'Our Timeline', icon: Calendar },
  { href: '/quotes', label: 'Love Quotes', icon: Quote },
  { href: '/ai-notes', label: 'AI Love Notes', icon: BotMessageSquare },
];

export function MainNav() {
  const pathname = usePathname();
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <>
      <div className="hidden md:flex items-center justify-between p-2">
        <SidebarTrigger>
          <PanelLeft />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
                className="transition-all duration-300 ease-in-out hover:scale-105 hover:translate-x-1"
              >
                <item.icon className="h-5 w-5 transition-transform duration-300" />
                <span className={cn(isCollapsed && !isMobile && 'hidden')}>
                  {item.label}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}