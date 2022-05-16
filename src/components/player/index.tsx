import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Flex,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdOutlineRepeat } from "react-icons/md";

import PlayButton from "components/play-button";

import { usePlayerData } from "context";

const playerButtons = [
  { "outline": "none", "variant": "link", "aria-label": "shuffle", "fontSize": "larger", "icon": <MdShuffle /> },
  { "outline": "none", "variant": "link", "aria-label": "prev", "fontSize": "larger", "icon": <MdSkipPrevious /> },
  { "outline": "none", "variant": "link", "aria-label": "play", "fontSize": "2.5rem" },
  { "outline": "none", "variant": "link", "aria-label": "next", "fontSize": "larger", "icon": <MdSkipNext /> },
  { "outline": "none", "variant": "link", "aria-label": "repeat", "fontSize": "larger", "icon": <MdOutlineRepeat /> },
];

function Player() {
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [isPlaying, { toggle: toggleIsPlaying }] = useBoolean(false);
  const [shouldRepeat, { toggle: toggleShouldRepeat }] = useBoolean(false);
  const [shouldShuffle, { toggle: toggleShouldShuffle }] = useBoolean(false);
  const { playingSong } = usePlayerData();
  console.log(playingSong);
  const btnColors = {
    play: "green.500", // later use this to make btn gray on initial loading
    next: "gray.400",
    prev: "gray.400",
    shuffle: shouldShuffle ? "gray.100" : "gray.400",
    repeat: shouldRepeat ? "gray.100" : "gray.400",
  };

  const btnOnClicks = {
    play: toggleIsPlaying,
    shuffle: toggleShouldShuffle,
    repeat: toggleShouldRepeat,
    next: () => {},
    prev: () => {},
  };

  function renderButtons(buttonData: typeof playerButtons[number]) {
    const ariaLabel = buttonData["aria-label"] as keyof typeof btnColors;
    const isPlayBtn = ariaLabel === "play";
    const buttonColor = btnColors[ariaLabel];
    const buttonOnClick = btnOnClicks[ariaLabel];

    return isPlayBtn ? (
      <PlayButton key={ariaLabel} {...buttonData} color={buttonColor} onClick={buttonOnClick} playing={isPlaying} />
    ) : (
      <IconButton key={ariaLabel} {...buttonData} color={buttonColor} onClick={buttonOnClick} />
    );
  }

  if (!playingSong) return null;

  return (
    <>
      <Box>{/* <ReactHowler /> */}</Box>

      <ButtonGroup display="flex" alignItems="center" justifyContent="center" color="white">
        {playerButtons.map(renderButtons)}
      </ButtonGroup>

      <Flex color="gray.400" justify="center" align="center">
        <Box width="10%">
          <Text fontSize="xs">1:21</Text>
        </Box>
        <Box width="80%">
          <RangeSlider aria-label={["min", "max"]} step={0.1} min={0} max={321} id="player-range">
            <RangeSliderTrack bg="gray.600">
              <RangeSliderFilledTrack bg="gray.100" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
        <Box width="10%" textAlign="right">
          <Text fontSize="xs">3:21</Text>
        </Box>
      </Flex>
    </>
  );
}

export default Player;
