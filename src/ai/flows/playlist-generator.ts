'use server';
/**
 * @fileOverview A playlist generator AI agent.
 *
 * - generatePlaylist - A function that handles the playlist generation process.
 * - GeneratePlaylistInput - The input type for the generatePlaylist function.
 * - GeneratePlaylistOutput - The return type for the generatePlaylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlaylistInputSchema = z.object({
  genres: z
    .string()
    .describe('A comma separated list of preferred music genres.'),
  artists: z.string().describe('A comma separated list of preferred artists.'),
});
export type GeneratePlaylistInput = z.infer<typeof GeneratePlaylistInputSchema>;

const GeneratePlaylistOutputSchema = z.object({
  playlist: z
    .string()
    .describe(
      'A list of songs appropriate for the event, based on the users preferences.'
    ),
});
export type GeneratePlaylistOutput = z.infer<typeof GeneratePlaylistOutputSchema>;

export async function generatePlaylist(
  input: GeneratePlaylistInput
): Promise<GeneratePlaylistOutput> {
  return generatePlaylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlaylistPrompt',
  input: {schema: GeneratePlaylistInputSchema},
  output: {schema: GeneratePlaylistOutputSchema},
  prompt: `You are an expert music curator for electronic music events.

You will generate a playlist of songs appropriate for the event, based on the users preferences.

Genres: {{{genres}}}
Artists: {{{artists}}}

Playlist:`,
});

const generatePlaylistFlow = ai.defineFlow(
  {
    name: 'generatePlaylistFlow',
    inputSchema: GeneratePlaylistInputSchema,
    outputSchema: GeneratePlaylistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
