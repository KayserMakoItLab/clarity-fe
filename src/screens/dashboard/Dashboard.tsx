import { useTasks } from "@/services";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Tfoot,
  Stack,
  Box,
  Button,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

const Dashboard = () => {
  const { useGetAllTasks } = useTasks();
  const { data: getAllTaskData } = useGetAllTasks();

  console.log("getAllTaskData", getAllTaskData);

  return (
    <Stack flexDir={"column"} padding={"1.5rem"} w={"100%"} h={"100%"} gap={0}>
      <Heading fontSize={"1.5rem"} color="black.400" mb={"1rem"}>
        Dashboard
      </Heading>
      <Stack borderTopRadius={"0.5rem"} bgColor={"white"}>
        <Heading fontSize={"1rem"} color="black.400" p={"1rem"}>
          Users
        </Heading>
      </Stack>
      <TableContainer bgColor={"white"} w={"100%"} h={"100%"}>
        <Table variant="simple">
          <Thead bgColor={"gray.100"}>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={"row"}
        bgColor={"white"}
        p={"1rem"}
        borderBottomRadius={"0.5rem"}
      >
        <Box color={"gray"} fontSize={"0.9rem"}>
          Showing 1 to 5 of 42 results
        </Box>
        <HStack gap={"0.5rem"}>
          <Button w={"6rem"} colorScheme="teal" variant="outline">
            Previous
          </Button>
          <Button w={"6rem"} colorScheme="teal" variant="outline">
            Next
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
