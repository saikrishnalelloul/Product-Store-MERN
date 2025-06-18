import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";
import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container>
      <VStack spaceX={10} spaceY={10}>
          <Heading fontSize={"2xl"}>Your Products</Heading>
        <SimpleGrid
        columns={{
          base:1,
          md:2,
          lg:3
        }}
        spacing={10}
        w={'full'}>
          {products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid >
        {products.length === 0 && (
          <Text>
          no products in vault..
          <Link to={"/create"}>
            <span color="blue.500" _hover={{ textDecoration: "underline" }}>
              create new
            </span>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
