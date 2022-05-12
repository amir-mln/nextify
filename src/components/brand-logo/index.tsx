import NextImage from "next/image";
import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/layout";

function BrandLogo() {
  return (
    <NextLink href="/" aria-label="home" passHref>
      <ChakraLink display="block" marginBottom="20px">
        <NextImage src="/img/nextify-logo.png" width={250} height={45} />
      </ChakraLink>
    </NextLink>
  );
}

export default BrandLogo;
