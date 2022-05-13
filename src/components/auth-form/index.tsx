import { FormEvent, FormEventHandler, useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { Center } from "@chakra-ui/layout";
import { Box, Input, Button } from "@chakra-ui/react";

import authFetcher from "lib/auth/fetcher";
import BrandLogo from "components/brand-logo";

function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    await authFetcher(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  }

  return (
    <Center flexDirection="column" height="100%">
      <BrandLogo />
      <Box
        as="form"
        padding="4"
        display="flex"
        width="33.33%"
        bgColor="gray.700"
        alignItems="center"
        flexDirection="column"
        borderRadius="sm"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="email"
          marginBottom="4"
          color="gray.100"
          borderRadius="sm"
          bgColor="gray.800"
          borderColor="gray.500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          marginBottom="4"
          color="gray.100"
          borderRadius="sm"
          bgColor="gray.800"
          borderColor="gray.500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          alignSelf="flex-start"
          bg="green.500"
          sx={{
            "&:hover": {
              bg: "green.300",
            },
          }}
        >
          {mode}
        </Button>
      </Box>
    </Center>
  );
}

export default AuthForm;
