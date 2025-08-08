
'use server';

/**
 * @fileOverview A flow to enhance the image prompt, optionally considering an artistic style and other advanced parameters.
 *
 * - enhanceImagePrompt - A function that enhances the image prompt.
 * - EnhanceImagePromptInput - The input type for the enhanceImagePrompt function.
 * - EnhanceImagePromptOutput - The return type for the enhanceImagePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceImagePromptInputSchema = z.object({
  prompt: z.string().describe('The base prompt to enhance.'),
  style: z.string().optional().describe('The artistic style for the image (e.g., photorealistic, cartoon, abstract).'),
  aspectRatio: z.string().optional().describe('The desired aspect ratio (e.g., "16:9 cinematic widescreen", "1:1 square", "9:16 tall portrait").'),
  styleStrength: z.number().optional().describe('A number from 1 to 10 indicating how strongly to apply the style. 10 is strongest.'),
  creativity: z.number().optional().describe('A number from 1 to 10 indicating the desired level of creativity. 10 is most creative.'),
  colorPalette: z.string().optional().describe('A description of the desired color palette (e.g., "warm tones", "monochromatic blue", "neon cyberpunk colors").'),
  quality: z.string().optional().describe('Desired quality level (e.g., "standard", "high detail", "ultra photorealistic").'),
  keywords: z.string().optional().describe('Additional keywords to incorporate into the prompt.'),
});
export type EnhanceImagePromptInput = z.infer<typeof EnhanceImagePromptInputSchema>;

const EnhanceImagePromptOutputSchema = z.object({
  enhancedPrompt: z.string().describe('The enhanced prompt, incorporating the style and other parameters if provided.'),
});
export type EnhanceImagePromptOutput = z.infer<typeof EnhanceImagePromptOutputSchema>;

export async function enhanceImagePrompt(input: EnhanceImagePromptInput): Promise<EnhanceImagePromptOutput> {
  return enhanceImagePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceImagePromptPrompt',
  input: {schema: EnhanceImagePromptInputSchema},
  output: {schema: EnhanceImagePromptOutputSchema},
  prompt: `You are an expert prompt engineer specializing in creating detailed, descriptive, and effective prompts for an advanced AI image generation model. Your task is to expand a user's base prompt by incorporating several creative parameters.

The final output must be a single, cohesive, and powerful prompt string. Do not output anything else.

**Base Prompt:**
"{{{prompt}}}"

**Creative Parameters to Incorporate:**

{{#if style}}
- **Artistic Style:** '{{{style}}}'.
  {{#if styleStrength}}
  - **Style Strength:** Apply this style with an intensity of {{styleStrength}} out of 10. A higher number means the style should be much more dominant and obvious in the final image.
  {{/if}}
{{else}}
- **Artistic Style:** None specified. Aim for a generally appealing, well-described image.
{{/if}}

{{#if aspectRatio}}
- **Aspect Ratio:** The image composition should be tailored for a '{{{aspectRatio}}}' format. Describe the scene in a way that fits this framing (e.g., for widescreen, describe a panoramic view; for portrait, describe a tall scene).
{{/if}}

{{#if quality}}
- **Quality & Detail:** The user has requested '{{{quality}}}' quality. Translate this into descriptive language. For "High Detail", this means adding intricate details, textures, and realism. For "Ultra Photorealistic", the prompt should be extremely specific about lighting, camera lenses, and realistic materials.
{{/if}}

{{#if creativity}}
- **Creativity Level:** The user wants a creativity level of {{creativity}} out of 10. A low number means stick close to the original prompt. A high number means you should take creative liberties, re-interpret the concept in a more unique, abstract, or unexpected way.
{{/if}}

{{#if colorPalette}}
- **Color Palette:** The dominant colors should follow this theme: '{{{colorPalette}}}'.
{{/if}}

{{#if keywords}}
- **Additional Keywords:** Ensure these keywords are naturally woven into the prompt: '{{{keywords}}}'.
{{/if}}

---

Now, based on all the above, generate the single, final, enhanced prompt string.`,
});

const enhanceImagePromptFlow = ai.defineFlow(
  {
    name: 'enhanceImagePromptFlow',
    inputSchema: EnhanceImagePromptInputSchema,
    outputSchema: EnhanceImagePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
