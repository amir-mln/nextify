import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import type { ColorProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type MainContentWrapperProps = {
  image: string;
  title: ReactNode;
  roundImage: boolean;
  subtitle: ReactNode;
  children: ReactNode;
  description: ReactNode;
  color: Exclude<ColorProps["color"], undefined>;
};

const MainContentWrapper = (props: MainContentWrapperProps) => {
  const { color, children, image, subtitle, title, description, roundImage } = props;

  return (
    <Box
      as="main"
      overflowY="auto"
      bgColor="gray.900"
      width="calc(100% - 250px)"
      minHeight="calc(100% - 81px)"
      maxHeight="calc(100% - 81px)"
    >
      <Flex bgGradient={`linear(${color} 0%, gray.900 100%)`} padding="16" align="end">
        {!!image && (
          <Image margin="20px" boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? "100%" : "3px"} />
        )}
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default MainContentWrapper;
