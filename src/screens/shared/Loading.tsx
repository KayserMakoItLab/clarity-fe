import { Spinner, Stack } from "@chakra-ui/react";

export default function Loader() {
  return (
    <>
      <Stack
        w={"100vw"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Stack>
    </>
  );
}
