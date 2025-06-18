import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const CreatePage = () => {
  const {createProduct} = useProductStore();
  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    if(!success){
      alert(`Error: ${message}`);
      return;
    }
    else{
      alert(`Success: ${message}`);
      setNewProduct({ name: "", price: "", image: "" });
    }
  };
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });
  return (
    <Container maxW={"container.sm"}>
      <VStack spaceY={8}>
        <Heading as={"h1"} textAlign={"center"} mb={8}>
          New Product
        </Heading>
        <Box
          w={{ base: "100%", md: "400px" }}
        mx="auto"
          p={6}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceY={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>
            <Button colorScheme={"blue"} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
