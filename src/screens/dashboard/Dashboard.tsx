import { useTasks } from "@/services";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Box,
  Button,
  Heading,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { CreateEditTaskPopUp, DeletePopUp } from "./components";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = searchParams.get("page") || "1";
  const [page, setPage] = useState(+currentPage);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [editMode, setEditMode] = useState({
    id: "",
    status: false,
  });
  const [openDeletePopUp, setOpenDeletePopUp] = useState({
    id: "",
    status: false,
  });

  const { useGetAllTasks } = useTasks();
  const { data: getAllTaskData } = useGetAllTasks(`${page}`);

  const handlePreviousPage = () => {
    if (getAllTaskData?.data && getAllTaskData?.data?.prev_page_url) {
      const newPage = +page - 1;
      setPage(newPage);
      const query = page ? `?page=${newPage}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  const handleNextPage = () => {
    if (getAllTaskData?.data && getAllTaskData?.data?.next_page_url) {
      const newPage = +page + 1;
      setPage(newPage);
      const query = page ? `?page=${newPage}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  return (
    <Stack flexDir={"column"} padding={"1.5rem"} w={"100%"} h={"100%"} gap={0}>
      {(openPopUp || editMode.status) && (
        <CreateEditTaskPopUp
          close={setOpenPopUp}
          edit={editMode}
          closeEdit={setEditMode}
        />
      )}
      {openDeletePopUp.status && (
        <DeletePopUp close={setOpenDeletePopUp} id={openDeletePopUp.id} />
      )}
      <HStack mb={"1rem"} justifyContent={"space-between"}>
        <Heading fontSize={"1.5rem"} color="black.400">
          Dashboard
        </Heading>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => {
            setOpenPopUp(!openPopUp);
            setEditMode({ id: "", status: false });
          }}
        >
          Create Task
        </Button>
      </HStack>
      <Stack borderTopRadius={"0.5rem"} bgColor={"white"}>
        <Heading fontSize={"1rem"} color="black.400" p={"0.8rem"}>
          Users
        </Heading>
      </Stack>
      <TableContainer bgColor={"white"} w={"100%"} h={"100%"}>
        <Table variant="simple">
          <Thead bgColor={"gray.100"}>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Due Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getAllTaskData?.data &&
              getAllTaskData?.data?.data?.map((item: any) => (
                <Tr maxH={"2rem"}>
                  <Td>
                    <Tooltip
                      label={item?.title}
                      aria-label="Full title"
                      openDelay={500}
                      closeDelay={300}
                    >
                      <Box isTruncated maxW="15rem">
                        {item?.title}
                      </Box>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip
                      label={item?.description}
                      aria-label="Full Description"
                      openDelay={500}
                      closeDelay={300}
                    >
                      <Box isTruncated maxW="15rem">
                        {item?.description}
                      </Box>
                    </Tooltip>
                  </Td>
                  <Td>{item?.status}</Td>
                  <Td>{item?.due_date}</Td>
                  <Td ml={"1rem"}>
                    <EditIcon
                      cursor={"pointer"}
                      onClick={() =>
                        setEditMode({ id: item?.id, status: true })
                      }
                    />
                    <DeleteIcon
                      ml={"1rem"}
                      cursor={"pointer"}
                      color={"red.500"}
                      onClick={() =>
                        setOpenDeletePopUp({
                          id: item?.id,
                          status: true,
                        })
                      }
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack
        justifyContent={"end"}
        alignItems={"center"}
        flexDir={"row"}
        bgColor={"white"}
        p={"1rem"}
        borderBottomRadius={"0.5rem"}
      >
        {/* <Box color={"gray"} fontSize={"0.9rem"}>
          Showing 1 to 5 of 42 results
        </Box> */}
        <HStack gap={"0.5rem"}>
          <Button
            w={"6rem"}
            colorScheme="teal"
            variant="outline"
            onClick={handlePreviousPage}
            isDisabled={!getAllTaskData?.data?.prev_page_url}
          >
            Previous
          </Button>
          <Button
            w={"6rem"}
            colorScheme="teal"
            variant="outline"
            onClick={handleNextPage}
            isDisabled={!getAllTaskData?.data?.next_page_url}
          >
            Next
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
