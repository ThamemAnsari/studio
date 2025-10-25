import Image from 'next/image';
import { timelineData } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Pin } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">Our Love Story</h1>
        <p className="mt-2 text-lg text-foreground/80">The journey that brought us here.</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        {timelineData.map((item, index) => (
          <div key={item.id} className={cn(
            'mb-8 flex justify-between items-center w-full',
            index % 2 === 0 ? 'flex-row-reverse' : ''
          )}>
            <div className="hidden md:block w-5/12"></div>
            <div className="z-10 flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground shadow-md">
              <Pin className="w-4 h-4" />
            </div>
            <div className="w-full md:w-5/12">
              <Card className="glass-card transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {item.image && (
                  <CardContent className="p-0">
                    <div className="aspect-video relative rounded-t-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                  </CardContent>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-accent">{item.title}</CardTitle>
                  <time className="text-sm text-primary font-semibold">{formatDate(item.date)}</time>
                  <CardDescription className="text-foreground/90 pt-2">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
