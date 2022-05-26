import { IconButton } from "@chakra-ui/react";
import { usePlayerDispatch, usePlayerState } from "context";
import { MdRepeat, MdShuffle } from "react-icons/md";

function RepeatButton() {
  const { shouldRepeat } = usePlayerState();
  const dispatch = usePlayerDispatch();

  const color = shouldRepeat ? "gray.100" : "gray.400";

  function toggleRepeat() {
    dispatch({ type: "TOGGLE_REPEAT_STATUS" });
  }

  return (
    <IconButton
      outline="none"
      variant="link"
      aria-label="repeat"
      fontSize="larger"
      color={color}
      icon={<MdRepeat />}
      onClick={toggleRepeat}
    />
  );
}

export default RepeatButton;
