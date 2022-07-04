import { IconButton, TypographyProps } from "@chakra-ui/react";

import { usePlayingSong } from "hooks/use-playing-songs";
import { usePlayerDispatch, usePlayerState } from "context";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";

export type PlayButtonProps = Partial<{
  propSongName: string;
  clickCallback: () => void;
  fontSize: TypographyProps["fontSize"];
}>;

function PlayButton({ propSongName, fontSize, clickCallback }: PlayButtonProps) {
  const { playing } = usePlayerState();
  const { name } = usePlayingSong() ?? {};
  const dispatch = usePlayerDispatch();
  const buttonIcon =
    playing && (name === propSongName || !propSongName) ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />;

  function togglePlaying() {
    if (clickCallback) clickCallback();
    dispatch({ type: "TOGGLE_PLAYING_STATUS" });
  }

  return (
    <IconButton
      outline="none"
      variant="link"
      color="green.500"
      aria-label="play"
      icon={buttonIcon}
      onClick={togglePlaying}
      fontSize={fontSize || "2.5rem"}
    />
  );
}

export default PlayButton;
