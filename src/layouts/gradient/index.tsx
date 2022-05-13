import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import type { ColorProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type GradientLayoutProps = {
  image: string;
  roundImage: boolean;
  children: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  color: ColorProps["color"];
};

const GradientLayout = ({ color, children, image, subtitle, title, description, roundImage }: GradientLayoutProps) => {
  return (
    <>
      <Flex bgGradient={`linear(${color} 0%, gray.900 100%)`} padding="40px" align="end">
        <Box padding="20px">
          <Image boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? "100%" : "3px"} />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box bgColor="gray.900" paddingY="50px">
        {children}
      </Box>
    </>
  );
};

export default GradientLayout;
