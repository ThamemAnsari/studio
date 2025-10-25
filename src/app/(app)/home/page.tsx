import { Countdown } from '@/components/countdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto animate-fade-in-up space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
          Welcome to Our Love Story
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          A special place for you, my love.
        </p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-6">
          <Countdown />
        </CardContent>
      </Card>
    </div>
  );
}
