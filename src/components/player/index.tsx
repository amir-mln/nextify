import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
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
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useStoreActions } from "easy-peasy";
import { useEffect, useRef, useState } from "react";

function Player() {
  return (
    <>
      <Box>{/* <ReactHowler /> */}</Box>

      <ButtonGroup display="flex" alignItems="center" justifyContent="center">
        <IconButton outline="none" variant="link" aria-label="shuffle" fontSize="larger" icon={<MdShuffle />} />
        <IconButton outline="none" variant="link" aria-label="skip" fontSize="larger" icon={<MdSkipPrevious />} />
        <IconButton
          outline="none"
          variant="link"
          aria-label="play"
          fontSize="40px"
          color="white"
          icon={<MdOutlinePlayCircleFilled />}
        />

        <IconButton outline="none" variant="link" aria-label="next" fontSize="larger" icon={<MdSkipNext />} />
        <IconButton outline="none" variant="link" aria-label="repeat" fontSize="larger" icon={<MdOutlineRepeat />} />
      </ButtonGroup>

      <Flex color="gray.400" justify="center" align="center">
        <Box width="10%">
          <Text fontSize="xs">1:21</Text>
        </Box>
        <Box width="80%">
          <RangeSlider aria-label={["min", "max"]} step={0.1} min={0} max={321} id="player-range">
            <RangeSliderTrack bg="gray.600">
              <RangeSliderFilledTrack bg="gray.400" />
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
