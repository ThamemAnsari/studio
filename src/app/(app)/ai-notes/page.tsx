import { AINoteForm } from '@/components/ai-note-form';

export default function AINotesPage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">AI Love Notes</h1>
        <p className="mt-2 text-lg text-foreground/80">A little help from the stars to say what&apos;s in your heart.</p>
      </div>
      <AINoteForm />
    </div>
  );
}
