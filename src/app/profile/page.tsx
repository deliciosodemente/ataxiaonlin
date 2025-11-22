"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserPlaylists, SavedPlaylist } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      loadPlaylists(user.uid);
    }
  }, [user, loading, router]);

  async function loadPlaylists(uid: string) {
    try {
      const data = await getUserPlaylists(uid);
      // Sort by date descending (client side for simplicity)
      data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setPlaylists(data);
    } catch (error) {
      console.error("Failed to load playlists", error);
    } finally {
      setIsLoadingData(false);
    }
  }

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
         <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-accent-foreground">
            {user.email ? user.email[0].toUpperCase() : 'U'}
         </div>
         <div>
           <h1 className="text-3xl font-bold">My Profile</h1>
           <p className="text-muted-foreground">{user.email}</p>
         </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">My Saved Playlists</h2>

        {isLoadingData ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-6 w-6 animate-spin text-accent" />
           </div>
        ) : playlists.length === 0 ? (
          <Card className="bg-card/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
               <Music className="h-12 w-12 text-muted-foreground mb-4" />
               <p className="text-muted-foreground mb-4">You haven't saved any playlists yet.</p>
               <Button onClick={() => router.push('/playlist-generator')}>Create a Playlist</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                   <CardTitle className="text-lg flex justify-between items-start">
                      <span>{playlist.genres}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {new Date(playlist.createdAt.seconds * 1000).toLocaleDateString()}
                      </span>
                   </CardTitle>
                   <p className="text-sm text-muted-foreground truncate">Based on: {playlist.artists}</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] rounded-md border p-4 bg-muted/50">
                     <pre className="whitespace-pre-wrap font-sans text-sm">{playlist.playlist}</pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
