
'use server';
/**
 * @fileOverview A Genkit flow to generate an image based on a prompt.
 *
 * - generateActualImage - A function that generates an image.
 * - GenerateActualImageInput - The input type for the generateActualImage function.
 * - GenerateActualImageOutput - The return type for the generateActualImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActualImageInputSchema = z.object({
  prompt: z.string().describe('The detailed prompt for image generation.'),
});
export type GenerateActualImageInput = z.infer<typeof GenerateActualImageInputSchema>;

const GenerateActualImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI (e.g., data:image/png;base64,...).'),
});
export type GenerateActualImageOutput = z.infer<typeof GenerateActualImageOutputSchema>;

export async function generateActualImage(input: GenerateActualImageInput): Promise<GenerateActualImageOutput> {
  return generateActualImageFlow(input);
}

const generateActualImageFlow = ai.defineFlow(
  {
    name: 'generateActualImageFlow',
    inputSchema: GenerateActualImageInputSchema,
    outputSchema: GenerateActualImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation', // Specified model for image generation
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must provide both TEXT and IMAGE
      },
    });

    if (!media || !media.url || !media.url.startsWith('data:image/')) {
      console.error('Image generation API response was invalid or not a data URI. Media object:', media);
      throw new Error('Image generation failed, did not return a valid image data URI, or the model could not produce an image for the prompt.');
    }

    return { imageDataUri: media.url };
  }
);
