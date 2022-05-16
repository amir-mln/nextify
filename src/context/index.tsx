import type { PlayListSong } from "pages/playlists/[id]";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export type PlayerDataContextType = {
  playingSong: PlayListSong | null;
  playerSongs: PlayListSong[];
  setPlayingSong: Dispatch<SetStateAction<PlayerDataContextType["playingSong"]>>;
  setPlayerSongs: Dispatch<SetStateAction<PlayerDataContextType["playerSongs"]>>;
};

const PlayerDataContext = createContext<PlayerDataContextType | null>(null);

PlayerDataContext.displayName = "PlayerDataContext";

export function usePlayerData() {
  const playerData = useContext(PlayerDataContext);

  if (playerData === null) throw new Error(`use ${PlayerDataContext.displayName} inside a component`);

  return { playingSong: playerData.playingSong, playerSongs: playerData.playerSongs };
}

export function usePlayerDispatch() {
  const playerData = useContext(PlayerDataContext);

  if (playerData === null) throw new Error(`use ${PlayerDataContext.displayName} inside a component`);

  return { dispatchPlayingSong: playerData.setPlayingSong, dispatchPlayerSongs: playerData.setPlayerSongs };
}

export function PlayerDataProvider({ children }: { children: ReactNode }) {
  const [playingSong, setPlayingSong] = useState<PlayerDataContextType["playingSong"]>(null);
  const [playerSongs, setPlayerSongs] = useState<PlayerDataContextType["playerSongs"]>([]);

  const value = { playingSong, setPlayingSong, playerSongs, setPlayerSongs };

  return <PlayerDataContext.Provider value={value}>{children}</PlayerDataContext.Provider>;
}
