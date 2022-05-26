import shuffleArray from "lib/shuffle-array";
import type { PlayListSong } from "pages/playlists/[id]";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useReducer, useState } from "react";

export type PlayerState = {
  key: string | number;
  index: number;
  songs: PlayListSong[];
  songsIndex: number[];
  shouldShuffle: boolean;
  shouldRepeat: boolean;
  playing: boolean;
};

export type PlayerAction =
  | {
      type: "SET_PLAYER_SONGS";
      payload: {
        key: PlayerState["key"];
        songs: PlayerState["songs"];
      };
    }
  | { type: "SET_PLAYER_INDEX"; payload: { index: PlayerState["index"] } }
  | {
      type:
        | "INCREASE_PLAYER_INDEX"
        | "DECREASE_PLAYER_INDEX"
        | "TOGGLE_SHUFFLE_STATUS"
        | "TOGGLE_REPEAT_STATUS"
        | "TOGGLE_PLAYING_STATUS";
      payload?: never;
    };

export type PlayerContextType = {
  playerState: PlayerState;
  dispatch: Dispatch<PlayerAction>;
};

const INITIAL_PLAYER_STATE = {
  key: "",
  index: 0,
  songs: [],
  songsIndex: [],
  shouldShuffle: false,
  shouldRepeat: false,
  playing: false,
};

const PlayerContext = createContext<PlayerContextType | null>(null);

PlayerContext.displayName = "PlayerContext";

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_PLAYER_SONGS": {
      const { key: actionKey, songs } = action.payload;
      const { key: stateKey, shouldShuffle } = state;

      if (actionKey === stateKey) return state;

      let songsIndex = Array(songs.length)
        .fill(0)
        .map((_, i) => i);

      if (shouldShuffle) songsIndex = shuffleArray(songsIndex);

      return { ...state, songs, songsIndex };
    }
    case "SET_PLAYER_INDEX": {
      const { index: actionIndex } = action.payload;
      const { shouldShuffle, songsIndex } = state;
      let index = shouldShuffle ? songsIndex.findIndex((songIndex) => songIndex === actionIndex) : actionIndex;

      return { ...state, index };
    }
    case "INCREASE_PLAYER_INDEX": {
      const { shouldRepeat, index, songsIndex } = state;
      const isLastSong = index === songsIndex.length;

      if (shouldRepeat) return state;

      if (isLastSong) return { ...state, index: 0 };

      return { ...state, index: index + 1 };
    }
    case "DECREASE_PLAYER_INDEX": {
      const { shouldRepeat, index, songsIndex } = state;
      const isFirstSong = index === 0;

      if (shouldRepeat) return state;

      if (isFirstSong) return { ...state, index: songsIndex.length - 1 };

      return { ...state, index: index - 1 };
    }
    case "TOGGLE_SHUFFLE_STATUS": {
      const nextShuffleStatus = !state.shouldShuffle;
      let index = state.index;
      let songsIndex = Array.from(state.songsIndex);

      if (!nextShuffleStatus) {
        // after sorting indexes, the value of each member of `songsIndex` will be equal to its corresponding index in `songsIndex`
        index = songsIndex[index];
        songsIndex = songsIndex.sort((a, b) => a - b);
      } else {
        songsIndex = shuffleArray(songsIndex);
        // since we shuffle, we cant guarantee that the value of songsIndex[index] will point to its new
        // position in the shuffled array, wo we have to look for it
        index = songsIndex.findIndex((newIndex) => newIndex === index);
      }

      return { ...state, shouldShuffle: nextShuffleStatus, songsIndex, index };
    }
    case "TOGGLE_PLAYING_STATUS":
      return { ...state, playing: !state.playing };
    case "TOGGLE_REPEAT_STATUS":
      return { ...state, shouldRepeat: !state.shouldRepeat };
    default:
      return state;
  }
}

export function usePlayerState() {
  const context = useContext(PlayerContext);

  if (context === null) throw new Error(`the ${PlayerContext.displayName}'s provider has not been used in the '_app'`);

  return context.playerState;
}

export function usePlayerDispatch() {
  const context = useContext(PlayerContext);

  if (context === null) throw new Error(`the ${PlayerContext.displayName}'s provider has not been used in the '_app'`);

  return context.dispatch;
}

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerState, dispatch] = useReducer(playerReducer, INITIAL_PLAYER_STATE);

  return <PlayerContext.Provider value={{ playerState, dispatch }}>{children}</PlayerContext.Provider>;
}
