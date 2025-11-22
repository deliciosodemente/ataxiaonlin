import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

export interface SavedPlaylist {
  id?: string;
  userId: string;
  playlist: string;
  genres: string;
  artists: string;
  createdAt: Timestamp;
}

export async function savePlaylistToDb(userId: string, playlistData: Omit<SavedPlaylist, 'id' | 'userId' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, "playlists"), {
      userId,
      ...playlistData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function getUserPlaylists(userId: string): Promise<SavedPlaylist[]> {
  const q = query(collection(db, "playlists"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const playlists: SavedPlaylist[] = [];
  querySnapshot.forEach((doc) => {
    playlists.push({ id: doc.id, ...doc.data() } as SavedPlaylist);
  });
  return playlists;
}
