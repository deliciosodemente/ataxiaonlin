"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playlistGeneratorSchema, type PlaylistGeneratorValues } from "@/lib/schemas";
import { generatePlaylist, type GeneratePlaylistOutput } from "@/ai/flows/playlist-generator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { savePlaylistToDb } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";

export default function PlaylistGeneratorForm() {
  const [playlistResult, setPlaylistResult] = useState<GeneratePlaylistOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<PlaylistGeneratorValues>({
    resolver: zodResolver(playlistGeneratorSchema),
    defaultValues: {
      genres: "",
      artists: "",
    },
  });

  async function onSubmit(values: PlaylistGeneratorValues) {
    setIsLoading(true);
    setError(null);
    setPlaylistResult(null);
    try {
      const result = await generatePlaylist(values);
      setPlaylistResult(result);
    } catch (err) {
      console.error("Error generating playlist:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!user || !playlistResult) return;
    setIsSaving(true);
    try {
      const values = form.getValues();
      await savePlaylistToDb(user.uid, {
        playlist: playlistResult.playlist,
        genres: values.genres,
        artists: values.artists
      });
      toast({
        title: "Playlist Saved",
        description: "Your generated playlist has been saved to your profile.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save playlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI Playlist Generator</CardTitle>
          <CardDescription>
            Enter your preferred genres and artists to generate a custom playlist for your ATAXIA experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="genres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Genres (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Techno, House, Trance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Artists (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Charlotte de Witte, Carl Cox, Amelie Lens" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? "Generating..." : "Generate Playlist"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {playlistResult && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Your Generated Playlist</CardTitle>
            {user && (
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save to Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={playlistResult.playlist}
              rows={15}
              className="text-sm bg-muted/50 mt-4"
            />
            {!user && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                <a href="/login" className="underline text-accent">Log in</a> to save this playlist.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
