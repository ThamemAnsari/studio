'use server';

import { generateAISentiment, GenerateAISentimentInput } from '@/ai/flows/generate-ai-sentiments';
import { z } from 'zod';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Please enter a topic with at least 3 characters.' }),
  tone: z.string(),
});

export type FormState = {
  message: string;
  sentiment?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateNoteAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
    };
  }

  try {
    const input: GenerateAISentimentInput = {
      topic: parsed.data.topic,
      tone: parsed.data.tone,
    };
    const result = await generateAISentiment(input);

    if (result.sentiment) {
      return { message: 'success', sentiment: result.sentiment };
    } else {
      return { message: 'Generation failed. Please try again.' };
    }
  } catch (error) {
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
