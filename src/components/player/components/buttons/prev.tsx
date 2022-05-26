import { IconButton } from "@chakra-ui/react";
import { usePlayerDispatch } from "context";
import { MdSkipPrevious } from "react-icons/md";

function PrevButton() {
  const dispatch = usePlayerDispatch();

  function goToPrevSong() {
    dispatch({ type: "DECREASE_PLAYER_INDEX" });
  }

  return (
    <IconButton
      outline="none"
      variant="link"
      color="gray.400"
      aria-label="next"
      fontSize="larger"
      onClick={goToPrevSong}
      icon={<MdSkipPrevious />}
    />
  );
}

export default PrevButton;
