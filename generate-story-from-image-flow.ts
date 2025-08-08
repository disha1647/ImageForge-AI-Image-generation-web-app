
'use server';
/**
 * @fileOverview A flow to generate a short story or "lore" based on a user-provided image.
 *
 * - generateStoryFromImage - A function that creates a story for an image.
 * - GenerateStoryFromImageInput - The input type for the function.
 * - GenerateStoryFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryFromImageInputSchema = z.object({
  imageDataUri: z.string().describe("A photo provided by the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateStoryFromImageInput = z.infer<typeof GenerateStoryFromImageInputSchema>;

const GenerateStoryFromImageOutputSchema = z.object({
  story: z.string().describe('The generated short story or lore based on the image.'),
});
export type GenerateStoryFromImageOutput = z.infer<typeof GenerateStoryFromImageOutputSchema>;

export async function generateStoryFromImage(input: GenerateStoryFromImageInput): Promise<GenerateStoryFromImageOutput> {
  return generateStoryFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryFromImagePrompt',
  input: {schema: GenerateStoryFromImageInputSchema},
  output: {schema: GenerateStoryFromImageOutputSchema},
  prompt: `You are a master storyteller and world-builder. Based on the following image, write a short, evocative piece of lore or a creative backstory for the scene. Make it imaginative and engaging.

Image: {{media url=imageDataUri}}

Your Story:`,
});

const generateStoryFromImageFlow = ai.defineFlow(
  {
    name: 'generateStoryFromImageFlow',
    inputSchema: GenerateStoryFromImageInputSchema,
    outputSchema: GenerateStoryFromImageOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a story for the image.");
    }
    return output;
  }
);
