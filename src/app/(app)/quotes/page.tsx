'use client';

import { useState, useEffect } from 'react';
import { quotesData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function QuotesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedFavorites = localStorage.getItem('favoriteQuotes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  if (!isClient) return null;

  return (
    <div className="container mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">Words of Love</h1>
        <p className="mt-2 text-lg text-foreground/80">Quotes that remind us of our story.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotesData.map((quote) => (
          <Card key={quote.id} className="glass-card flex flex-col justify-between">
            <CardContent className="p-6">
              <blockquote className="space-y-4">
                <p className="font-headline text-xl text-foreground">&quot;{quote.text}&quot;</p>
                <footer className="text-sm text-foreground/70">- {quote.author}</footer>
              </blockquote>
            </CardContent>
            <div className="p-6 pt-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(quote.id)}
                aria-label={favorites.includes(quote.id) ? 'Unfavorite' : 'Favorite'}
              >
                <Heart className={cn(
                  "w-6 h-6 text-primary transition-all",
                  favorites.includes(quote.id) ? 'fill-current' : 'fill-transparent'
                )} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
