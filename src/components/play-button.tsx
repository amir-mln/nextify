import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";

export interface PlayButtonProps extends IconButtonProps {
  playing: boolean;
  "aria-label": string;
}

function PlayButton({ playing, ...rest }: PlayButtonProps) {
  const buttonIcon = playing ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />;

  return <IconButton {...rest} icon={buttonIcon} />;
}

export default PlayButton;
