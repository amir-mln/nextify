import { IconButton } from "@chakra-ui/react";

import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { usePlayerDispatch, usePlayerState } from "context";

function PlayButton() {
  const { playing } = usePlayerState();
  const dispatch = usePlayerDispatch();
  const buttonIcon = playing ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />;

  function togglePlaying() {
    dispatch({ type: "TOGGLE_PLAYING_STATUS" });
  }

  return (
    <IconButton
      outline="none"
      variant="link"
      color="green.500"
      fontSize="2.5rem"
      aria-label="play"
      icon={buttonIcon}
      onClick={togglePlaying}
    />
  );
}

export default PlayButton;
