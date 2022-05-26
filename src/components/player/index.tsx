import {
  Box,
  Flex,
  Text,
  IconButton,
  useBoolean,
  ButtonGroup,
  RangeSlider,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderFilledTrack,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";

import { usePlayerDispatch, usePlayerState } from "context";
import { formatTime } from "lib/formatter";
import { usePlayingSong } from "hooks/use-playing-songs";

import ShuffleButton from "./components/buttons/shuffle";
import PrevButton from "./components/buttons/prev";
import PlayButton from "./components/buttons/play";
import NextButton from "./components/buttons/next";
import RepeatButton from "./components/buttons/repeat";

function Player() {
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [isSeeking, { on: setIsSeekingOn, off: setIsSeekingOff }] = useBoolean(false);
  const playerRef = useRef<ReactHowler | null>(null);

  const playingSong = usePlayingSong();
  const { shouldRepeat, playing: isPlaying } = usePlayerState();
  const dispatch = usePlayerDispatch();

  function onEnd() {
    if (!playerRef.current) return;

    if (!shouldRepeat) return dispatch({ type: "INCREASE_PLAYER_INDEX" });

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
    setSeek(seekValues[0]);
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
        <ShuffleButton />
        <PrevButton />
        <PlayButton />
        <NextButton />
        <RepeatButton />
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
            id="player-range"
            aria-label={["min", "max"]}
            onChange={onSeek}
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
