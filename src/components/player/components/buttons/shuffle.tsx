import { IconButton } from "@chakra-ui/react";
import { usePlayerDispatch, usePlayerState } from "context";
import { MdShuffle } from "react-icons/md";

function ShuffleButton() {
  const { shouldShuffle } = usePlayerState();
  const dispatch = usePlayerDispatch();

  const color = shouldShuffle ? "gray.100" : "gray.400";

  function toggleShuffle() {
    dispatch({ type: "TOGGLE_SHUFFLE_STATUS" });
  }

  return (
    <IconButton
      aria-label="shuffle"
      fontSize="larger"
      outline="none"
      variant="link"
      color={color}
      icon={<MdShuffle />}
      onClick={toggleShuffle}
    />
  );
}

export default ShuffleButton;
