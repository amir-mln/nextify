import { Song } from "@prisma/client";
import { createStore, action, Action, State } from "easy-peasy";

type StoreModel = {
  activeSongs: Partial<Song>[];
  activeSong: Partial<Song> | null;
  changeActiveSongs: Action<StoreModel, Partial<Song>>;
  changeActiveSong: Action<StoreModel, Partial<Song>>;
};

const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,

  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});

export default store;
