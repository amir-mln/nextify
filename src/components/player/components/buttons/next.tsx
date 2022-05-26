import { IconButton } from "@chakra-ui/react";
import { usePlayerDispatch } from "context";
import { MdSkipNext } from "react-icons/md";

function NextButton() {
  const dispatch = usePlayerDispatch();
  function goToNextSong() {
    dispatch({ type: "INCREASE_PLAYER_INDEX" });
  }

  return (
    <IconButton
      outline="none"
      variant="link"
      color="gray.400"
      aria-label="prev"
      fontSize="larger"
      onClick={goToNextSong}
      icon={<MdSkipNext />}
    />
  );
}

export default NextButton;
