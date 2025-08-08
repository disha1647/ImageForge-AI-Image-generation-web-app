
'use server';
/**
 * @fileOverview A flow to generate React component code from a UI image.
 *
 * - generateUiFromImage - A function that creates component code from an image.
 * - GenerateUiFromImageInput - The input type for the function.
 * - GenerateUiFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUiFromImageInputSchema = z.object({
  imageDataUri: z.string().describe("A screenshot of a user interface, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateUiFromImageInput = z.infer<typeof GenerateUiFromImageInputSchema>;

const GenerateUiFromImageOutputSchema = z.object({
  componentCode: z.string().describe('The generated React component code as a single string.'),
});
export type GenerateUiFromImageOutput = z.infer<typeof GenerateUiFromImageOutputSchema>;

export async function generateUiFromImage(input: GenerateUiFromImageInput): Promise<GenerateUiFromImageOutput> {
  return generateUiFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUiFromImagePrompt',
  input: {schema: GenerateUiFromImageInputSchema},
  output: {schema: GenerateUiFromImageOutputSchema},
  prompt: `You are an expert front-end developer specializing in Next.js, React, and ShadCN UI components.
Your task is to analyze the provided image of a user interface and generate a single, complete React component file that implements it.

- Use TypeScript for all code.
- Where appropriate, use ShadCN UI components (e.g., import { Button } from '@/components/ui/button';).
- For icons, use 'lucide-react'.
- For any images, use placeholder images from 'https://placehold.co/'.
- The entire output must be a single block of raw code for one component file.
- Start the file with "'use client';" if it contains client-side interactivity.
- Do NOT include any explanations, comments, or markdown code fences like \`\`\`tsx. Only output the code itself.

Analyze this image and generate the code.

Image: {{media url=imageDataUri}}
`,
});

const generateUiFromImageFlow = ai.defineFlow(
  {
    name: 'generateUiFromImageFlow',
    inputSchema: GenerateUiFromImageInputSchema,
    outputSchema: GenerateUiFromImageOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to generate component code for the image.");
    }
    return output;
  }
);
