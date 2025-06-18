import { Button, Container, Flex, HStack, Text, ToggleContext } from "@chakra-ui/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        h={14}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          as={Link}
          to="/"
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          // textTransform="uppercase"
          textAlign="center"
          color="blue.500"
          // bgClip="text"
        >
          Product Store 🛒
        </Text>
        <HStack>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
           {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
