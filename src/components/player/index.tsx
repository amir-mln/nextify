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
import { useEffect, useMemo, useRef, useState } from "react";
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdOutlineRepeat } from "react-icons/md";

import PlayButton from "components/play-button";

import { usePlayerData } from "context";
import getRandomNum from "lib/random-number";
import { formatTime } from "lib/formatter";

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
  const [isSeeking, { on: setIsSeekingOn, off: setIsSeekingOff }] = useBoolean(false);
  const [isPlaying, { toggle: toggleIsPlaying }] = useBoolean(false);
  const [shouldRepeat, { toggle: toggleShouldRepeat }] = useBoolean(false);
  const [shouldShuffle, { toggle: toggleShouldShuffle }] = useBoolean(false);
  const { playingSong, playerSongs } = usePlayerData();
  const playerRef = useRef<ReactHowler | null>(null);

  const btnColors = {
    play: "green.500", // later use this to make btn gray on initial loading
    next: "gray.400",
    prev: "gray.400",
    shuffle: shouldShuffle ? "gray.100" : "gray.400",
    repeat: shouldRepeat ? "gray.100" : "gray.400",
  };

  const btnOnClicks = useMemo(
    () => ({
      play: toggleIsPlaying,
      shuffle: toggleShouldShuffle,
      repeat: toggleShouldRepeat,
      next: () =>
        setIndex((prevIndex) => {
          let next = prevIndex === playerSongs.length - 1 ? 0 : prevIndex + 1;

          if (shouldShuffle) {
            next = getRandomNum(playerSongs.length, prevIndex);
          }

          return next;
        }),
      prev: () => setIndex((prev) => (prev ? prev - 1 : playerSongs.length - 1)),
    }),
    []
  );

  function onEnd() {
    if (!playerRef.current) return;

    if (!shouldRepeat) return btnOnClicks.next();

    playerRef.current.seek(0);
    setSeek(0);
  }

  function onLoad() {
    if (!playerRef.current) return;

    const songDuration = playerRef.current.duration();
    setDuration(songDuration);
  }

  function onSeek(seekValues: number[]) {
    if (!playerRef.current) return;

    playerRef.current?.seek(seekValues[0]);
    setSeek(parseFloat(seekValues[0] + ""));
  }

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

  useEffect(() => {
    let timerId: number;

    if (isPlaying && !isSeeking) {
      const raqCallback = () => {
        setSeek(playerRef.current!.seek());
        timerId = requestAnimationFrame(raqCallback);
      };

      timerId = requestAnimationFrame(raqCallback);
      return () => cancelAnimationFrame(timerId);
    }
  }, [isPlaying, isSeeking]);

  if (!playingSong) return null;

  return (
    <>
      <Box>
        <ReactHowler playing={isPlaying} src={playingSong.url} ref={playerRef} onLoad={onLoad} onEnd={onEnd} />
      </Box>

      <ButtonGroup display="flex" alignItems="center" justifyContent="center" color="white">
        {playerButtons.map(renderButtons)}
      </ButtonGroup>

      <Flex color="gray.400" justify="center" align="center">
        <Box width="10%">
          <Text fontSize="xs">{formatTime(seek)}</Text>
        </Box>
        <Box width="80%">
          <RangeSlider
            min={0}
            step={0.1}
            value={[seek]}
            onChange={onSeek}
            id="player-range"
            aria-label={["min", "max"]}
            onChangeStart={setIsSeekingOn}
            onChangeEnd={setIsSeekingOff}
            max={duration ? +duration.toFixed(2) : 0}
          >
            <RangeSliderTrack bg="gray.600">
              <RangeSliderFilledTrack bg="gray.100" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
        <Box width="10%" textAlign="right">
          <Text fontSize="xs">{formatTime(duration)}</Text>
        </Box>
      </Flex>
    </>
  );
}

export default Player;
