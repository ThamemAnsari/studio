'use server';

/**
 * @fileOverview A flow for generating loving sentiments using generative AI.
 *
 * - generateAISentiment - A function that generates loving sentiments.
 * - GenerateAISentimentInput - The input type for the generateAISentiment function.
 * - GenerateAISentimentOutput - The output type for the generateAISentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAISentimentInputSchema = z.object({
  topic: z.string().describe('The topic or theme for the loving sentiment.'),
  tone: z.string().optional().default('romantic').describe('The tone of the sentiment (e.g., romantic, playful, sincere).'),
});
export type GenerateAISentimentInput = z.infer<typeof GenerateAISentimentInputSchema>;

const GenerateAISentimentOutputSchema = z.object({
  sentiment: z.string().describe('The generated loving sentiment.'),
});
export type GenerateAISentimentOutput = z.infer<typeof GenerateAISentimentOutputSchema>;

export async function generateAISentiment(input: GenerateAISentimentInput): Promise<GenerateAISentimentOutput> {
  return generateAISentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAISentimentPrompt',
  input: {schema: GenerateAISentimentInputSchema},
  output: {schema: GenerateAISentimentOutputSchema},
  prompt: `You are a creative AI assistant that specializes in generating loving sentiments.

  Generate a heartfelt and original loving sentiment based on the given topic and tone.

  Topic: {{{topic}}}
  Tone: {{{tone}}}
  Sentiment:
  `,
});

const generateAISentimentFlow = ai.defineFlow(
  {
    name: 'generateAISentimentFlow',
    inputSchema: GenerateAISentimentInputSchema,
    outputSchema: GenerateAISentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
