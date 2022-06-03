import NextLink from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Center, Link } from "@chakra-ui/layout";
import { Box, Input, Button, Alert, AlertIcon } from "@chakra-ui/react";

import authFetcher from "lib/auth/fetcher";
import BrandLogo from "components/brand-logo";

import type { AuthFetcherMods } from "lib/auth/fetcher";

function AuthForm({ mode }: { mode: AuthFetcherMods }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inSignupMode = mode === "signup";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (inSignupMode && password !== password2) return void setError("passwords do not match");

    if (inSignupMode && !username.trim()) return void setError("invalid username");

    setIsLoading(true);

    const body = inSignupMode ? { username, password, email } : { password, email };

    try {
      await authFetcher(mode, body);
      setIsLoading(false);
      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
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
        marginBottom="20px"
        alignItems="center"
        flexDirection="column"
        borderRadius="sm"
        onSubmit={handleSubmit}
      >
        {inSignupMode && (
          <Input
            type="text"
            placeholder="username"
            marginBottom="4"
            color="gray.100"
            borderRadius="sm"
            bgColor="gray.800"
            borderColor="gray.500"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
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
        {inSignupMode && (
          <Input
            type="password"
            placeholder="confirm password"
            marginBottom="4"
            color="gray.100"
            borderRadius="sm"
            bgColor="gray.800"
            borderColor="gray.500"
            onChange={(e) => setPassword2(e.target.value)}
          />
        )}
        <Box
          as="span"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          alignSelf="flex-start"
        >
          <Button
            type="submit"
            isLoading={isLoading}
            bg="green.500"
            sx={{
              "&:hover": {
                bg: "green.300",
              },
            }}
          >
            {mode}
          </Button>
          <NextLink href={`/auth/${inSignupMode ? "signin" : "signup"}`} passHref>
            <Link>{inSignupMode ? "Already Have An Account?" : "Want To Create A New Account?"}</Link>
          </NextLink>
        </Box>
      </Box>
      <Alert status="error" width="33.33%" borderRadius="sm" opacity={error ? 1 : 0} color="gray.100" bgColor="red.800">
        <AlertIcon color="red.300" />
        {error}
      </Alert>
    </Center>
  );
}

export default AuthForm;
