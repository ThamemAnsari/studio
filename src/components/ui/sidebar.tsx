'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetTrigger as SheetPrimitiveTrigger } from '@/components/ui/sheet';
import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isCollapsed, toggleSidebar, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, isOpen, setIsOpen, isCollapsed } = useSidebar();

    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        className={cn(
          'relative hidden h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out md:flex',
          isCollapsed ? 'w-16' : 'w-64',
          className
        )}
        data-collapsed={isCollapsed}
        {...props}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-16 shrink-0 items-center border-b px-4 transition-all',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isMobile } = useSidebar();
    if (isMobile) {
      return (
        <SheetContent side="left" className={cn('flex w-64 flex-col p-0', className)}>
          {children}
        </SheetContent>
      );
    }
    return (
      <div ref={ref} className={cn('flex flex-1 flex-col overflow-y-auto overflow-x-hidden', className)} {...props}>
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = 'SidebarContent';

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, toggleSidebar } = useSidebar();

    if (isMobile) {
      return (
        <SheetPrimitiveTrigger asChild>
          <Button ref={ref} variant="ghost" size="icon" className={cn(className)} {...props}>
            {children}
          </Button>
        </SheetPrimitiveTrigger>
      );
    }

    return (
      <Button ref={ref} variant="ghost" size="icon" className={cn(className)} onClick={toggleSidebar} {...props}>
        {children}
      </Button>
    );
  }
);
SidebarTrigger.displayName = 'SidebarTrigger';

export const SidebarMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn('flex flex-col gap-1 p-2', className)} {...props}>
        <ul className="flex flex-col gap-1">{children}</ul>
      </nav>
    );
  }
);
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn('list-none', className)} {...props}>
        {children}
      </li>
    );
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean;
  isActive?: boolean;
  href: string;
  tooltip?: {
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
  };
}

export const SidebarMenuButton = React.forwardRef<HTMLAnchorElement, SidebarMenuButtonProps>(
  ({ className, children, isActive, asChild, href, tooltip, ...props }, ref) => {
    const { isCollapsed, isMobile, setIsOpen } = useSidebar();
    const Comp = asChild ? Slot : Link;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isMobile) setIsOpen(false);
      if (props.onClick) props.onClick(e);
    };

    const button = (
      <Comp href={href} ref={ref} onClick={handleClick} {...props}>
        <span
          className={cn(
            buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'default' }),
            'w-full justify-start',
            isCollapsed && !isMobile ? 'h-10 w-10 justify-center p-0' : '',
            className
          )}
        >
          {children}
        </span>
      </Comp>
    );

    if (isCollapsed && !isMobile && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side={tooltip.side || 'right'}>
            {tooltip.children}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
SidebarInset.displayName = 'SidebarInset';
