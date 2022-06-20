import { Box, Flex } from "@chakra-ui/layout";
import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import fetcher from "lib/fetcher";

import type { PagePropsWithLayout } from "pages/_app";

function NewSong() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hasMessage = !!successMessage || !!errorMessage;

  async function handleFormSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetcher("/api/new-song", formData, "multipart/form-data; boundary=zzz???xxx");
      setSuccessMessage("Song Added Successfully");
      // form.reset();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (successMessage) setTimeout(() => setSuccessMessage(""), 2000);
    if (errorMessage) setTimeout(() => setErrorMessage(""), 2000);
  }, [successMessage, errorMessage]);

  return (
    <Box as="form" width="33.33%" marginX="auto" onSubmit={handleFormSubmit}>
      <FormControl marginBottom="4" isRequired color="gray.500">
        <FormLabel _focus={{ color: "gray.300" }} htmlFor="song-title">
          Title
        </FormLabel>
        <Input
          name="title"
          type="text"
          id="song-title"
          backgroundColor="gray.800"
          _focus={{ color: "gray.300", borderColor: "gray.300" }}
        />
      </FormControl>
      <FormControl marginBottom="4" isRequired color="gray.500">
        <FormLabel _focus={{ color: "gray.300" }} htmlFor="song-artist">
          Artist
        </FormLabel>
        <Input
          name="artist"
          type="text"
          id="song-artist"
          backgroundColor="gray.800"
          _focus={{ color: "gray.300", borderColor: "gray.300" }}
        />
      </FormControl>
      <FormControl marginBottom="4" color="gray.500" isRequired>
        <FormLabel _focus={{ color: "gray.300" }} htmlFor="song-file">
          Upload
        </FormLabel>
        <Input
          name="file"
          type="file"
          paddingX="0"
          id="song-file"
          accept="audio/*"
          backgroundColor="gray.800"
          _focus={{ color: "gray.300", borderColor: "gray.300" }}
        />
      </FormControl>
      <Flex as="span" justifyContent="space-between">
        <Button isLoading={isLoading} type="submit" colorScheme="green">
          Submit
        </Button>
        <Alert
          height="40px"
          borderRadius="md"
          width="calc(100% - 100px)"
          opacity={hasMessage ? 1 : 0}
          status={successMessage ? "success" : "error"}
        >
          {successMessage || errorMessage}
        </Alert>
      </Flex>
    </Box>
  );
}

function getStaticProps(): PagePropsWithLayout {
  return {
    props: {
      layout: {
        type: "MAIN",
        mainContentProps: {
          image: "",
          subtitle: "",
          roundImage: false,
          title: "New Song",
          color: "blueviolet",
          description: "fill in the form and upload your song",
        },
      },
    },
  };
}

export { getStaticProps };

export default NewSong;
