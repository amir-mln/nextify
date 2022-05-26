import { usePlayerState } from "context";

export function usePlayingSong() {
  const { songs, songsIndex, index } = usePlayerState();

  return songs[songsIndex[index]] || null;
}
