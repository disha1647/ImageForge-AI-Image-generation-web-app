'use server';

/**
 * @fileOverview A Genkit flow for suggesting image prompts based on a user-provided theme.
 *
 * - suggestImagePrompts: A function that suggests image prompts based on a given theme.
 * - SuggestImagePromptsInput: The input type for the suggestImagePrompts function.
 * - SuggestImagePromptsOutput: The output type for the suggestImagePrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImagePromptsInputSchema = z.object({
  theme: z.string().describe('The general theme for generating image prompts.'),
});
export type SuggestImagePromptsInput = z.infer<typeof SuggestImagePromptsInputSchema>;

const SuggestImagePromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('An array of suggested image prompts based on the theme.'),
});
export type SuggestImagePromptsOutput = z.infer<typeof SuggestImagePromptsOutputSchema>;

export async function suggestImagePrompts(input: SuggestImagePromptsInput): Promise<SuggestImagePromptsOutput> {
  return suggestImagePromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImagePromptsPrompt',
  input: {schema: SuggestImagePromptsInputSchema},
  output: {schema: SuggestImagePromptsOutputSchema},
  prompt: `You are an AI assistant that specializes in generating creative image prompts based on a given theme.  Generate 3 distinct and imaginative prompts. Do not include any explanation.

Theme: {{{theme}}}`,
});

const suggestImagePromptsFlow = ai.defineFlow(
  {
    name: 'suggestImagePromptsFlow',
    inputSchema: SuggestImagePromptsInputSchema,
    outputSchema: SuggestImagePromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
