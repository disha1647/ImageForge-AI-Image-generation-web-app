
import { config } from 'dotenv';
config();

import '@/ai/flows/enhance-image-prompt.ts';
import '@/ai/flows/generate-image-prompt.ts';
import '@/ai/flows/generate-actual-image-flow.ts';
import '@/ai/flows/generate-lore-flow.ts';
import '@/ai/flows/refine-lore-flow.ts';
import '@/ai/flows/generate-story-from-image-flow.ts';
import '@/ai/flows/generate-ui-from-image-flow.ts';
