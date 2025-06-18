import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "@/store/product";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { useColorModeValue } from "./ui/color-mode";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = React.useState(product);
  const [isOpen, setIsOpen] = React.useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    alert(success ? "Product deleted successfully" : message);
  };

  const handleUpdate = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    alert(success ? "Product updated successfully" : message);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Chakra UI color mode values
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("#ffffff", "#1A202C"); // Chakra's default dark bg
  const labelColor = useColorModeValue("gray.700", "gray.300");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      m={5}
      bg={useColorModeValue("white", "gray.800")}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack>
          <Button leftIcon={<MdEdit />} colorScheme="blue" onClick={handleOpen}>
            Edit
          </Button>
          <Button leftIcon={<MdDelete />} colorScheme="red" onClick={() => handleDelete(product._id)}>
            Delete
          </Button>
        </HStack>
      </Box>

      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {
            background: bg, // solid background using Chakra’s theme
            color: textColor,
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            inset: "40px",
          },
        }}
      >
        <Heading as="h2" size="md" mb={4}>
          Edit Product
        </Heading>

        <Box mb={4}>
          <Text mb={1} color={labelColor}>
            Name
          </Text>
          <Input
            bg={inputBg}
            placeholder="Product Name"
            name="name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
        </Box>

        <Box mb={4}>
          <Text mb={1} color={labelColor}>
            Price
          </Text>
          <Input
            bg={inputBg}
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
        </Box>

        <Box mb={4}>
          <Text mb={1} color={labelColor}>
            Image URL
          </Text>
          <Input
            bg={inputBg}
            name="image"
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
          />
        </Box>

        <HStack justify="flex-end">
          <Button colorScheme="blue" mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
            Update
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </HStack>
      </Modal>
    </Box>
  );
};

export default ProductCard;
