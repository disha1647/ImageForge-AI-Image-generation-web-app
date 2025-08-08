
'use server';

/**
 * @fileOverview A flow to refine an existing story based on user instructions.
 *
 * - refineLore - A function that rewrites a story based on feedback.
 * - RefineLoreInput - The input type for the refineLore function.
 * - RefineLoreOutput - The return type for the refineLore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineLoreInputSchema = z.object({
  originalLore: z.string().describe('The original story to be refined.'),
  instruction: z.string().describe('The user\'s instruction for how to change the story.'),
});
export type RefineLoreInput = z.infer<typeof RefineLoreInputSchema>;

const RefineLoreOutputSchema = z.object({
  refinedLore: z.string().describe('The new, rewritten story.'),
});
export type RefineLoreOutput = z.infer<typeof RefineLoreOutputSchema>;

export async function refineLore(input: RefineLoreInput): Promise<RefineLoreOutput> {
  return refineLoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineLorePrompt',
  input: {schema: RefineLoreInputSchema},
  output: {schema: RefineLoreOutputSchema},
  prompt: `You are a master collaborative storyteller. A user has provided a story and an instruction to refine it.
Your task is to rewrite the story based on the user's feedback, maintaining the original tone and style unless instructed otherwise.

Original Story:
"{{{originalLore}}}"

User's Instruction: "{{{instruction}}}"

Now, provide the new, refined version of the story.`,
});

const refineLoreFlow = ai.defineFlow(
  {
    name: 'refineLoreFlow',
    inputSchema: RefineLoreInputSchema,
    outputSchema: RefineLoreOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to refine the story.");
    }
    return output;
  }
);
