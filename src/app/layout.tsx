import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { PT_Sans, Playfair_Display } from 'next/font/google'
import { cn } from '@/lib/utils';

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
})

const fontBody = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})


export const metadata: Metadata = {
  title: 'Eternal Echoes',
  description: 'A beautiful, romantic web application celebrating our love story.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        fontHeadline.variable,
        fontBody.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
