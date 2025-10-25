'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateNoteAction, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BotMessageSquare, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <>Generate Note <Sparkles className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function AINoteForm() {
  const [state, formAction] = useFormState(generateNoteAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="glass-card">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-accent flex items-center gap-2">
              <BotMessageSquare /> AI Love Note Generator
            </CardTitle>
            <CardDescription>
              Stuck for words? Let our AI help you express your feelings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">What&apos;s on your mind?</Label>
              <Textarea
                id="topic"
                name="topic"
                placeholder="e.g., 'How I feel when you smile'"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Choose a tone</Label>
              <Select name="tone" defaultValue="romantic">
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">Romantic</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="sincere">Sincere</SelectItem>
                  <SelectItem value="poetic">Poetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card className="glass-card flex flex-col">
         <CardHeader>
            <CardTitle className="font-headline text-accent">Your Generated Note</CardTitle>
            <CardDescription>A little inspiration from our digital muse.</CardDescription>
          </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {state.sentiment ? (
            <p className="font-headline text-xl text-center italic text-foreground">
              &quot;{state.sentiment}&quot;
            </p>
          ) : (
            <p className="text-muted-foreground text-center">Your beautifully crafted note will appear here...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
