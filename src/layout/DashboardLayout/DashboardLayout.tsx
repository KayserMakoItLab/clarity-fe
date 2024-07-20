"use client";

import { Loading } from "@/screens";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show, setShow] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setShow(true);
    }
  }, [status]);
  return (
    <>
      {show ? (
        <Flex
          flexDirection="row"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            alignItems="center"
            width={"10%"}
            minW={"12rem"}
            bgColor={"white"}
            h={"100vh"}
            padding={"1rem"}
            justifyContent={"space-between"}
          >
            <Box w={"100%"}>
              <Heading
                w={"100%"}
                display={"flex"}
                justifyContent={"center"}
                color="teal.400"
              >
                Logo
              </Heading>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bgColor={"transparent"}
                width="100%"
                mt={"1.5rem"}
                color={"gray"}
              >
                Dashboard
              </Button>
            </Box>
            <Popover>
              <PopoverTrigger>
                <Avatar
                  mb={"1rem"}
                  bg="teal.500"
                  alignItems={"start"}
                  cursor={"pointer"}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent ml={"1rem"} w={"10rem"} p={"0.5rem"}>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text fontWeight={"600"} fontSize={"18px"}>
                      Hi, User!
                    </Text>
                    <Button
                      w={"100%"}
                      mt={"0.4rem"}
                      colorScheme="teal"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Stack>
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            width={"90%"}
            h={"100%"}
          >
            {children}
          </Stack>
        </Flex>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DashboardLayout;
