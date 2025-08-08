
'use server';

/**
 * @fileOverview A flow to generate a short story or "lore" based on an image prompt.
 *
 * - generateLore - A function that creates a story for an image.
 * - GenerateLoreInput - The input type for the generateLore function.
 * - GenerateLoreOutput - The return type for the generateLore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoreInputSchema = z.object({
  prompt: z.string().describe('The detailed image prompt to base the story on.'),
});
export type GenerateLoreInput = z.infer<typeof GenerateLoreInputSchema>;

const GenerateLoreOutputSchema = z.object({
  lore: z.string().describe('The generated short story or lore.'),
});
export type GenerateLoreOutput = z.infer<typeof GenerateLoreOutputSchema>;

export async function generateLore(input: GenerateLoreInput): Promise<GenerateLoreOutput> {
  return generateLoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLorePrompt',
  input: {schema: GenerateLoreInputSchema},
  output: {schema: GenerateLoreOutputSchema},
  prompt: `You are a master storyteller and world-builder. Based on the following image description, write a short, evocative piece of lore or a creative backstory for the scene. Make it imaginative and engaging.

Image Description: {{{prompt}}}

Your Story:`,
});

const generateLoreFlow = ai.defineFlow(
  {
    name: 'generateLoreFlow',
    inputSchema: GenerateLoreInputSchema,
    outputSchema: GenerateLoreOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a story.");
    }
    return output;
  }
);
