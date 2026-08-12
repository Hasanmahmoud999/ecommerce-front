import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";
import axios from "axios";
import { md } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 90px;
  gap: 10px;
  //   flex-wrap: wrap;
  justify-content: space-evenly;
  // ${md({ justifyContent: "space-evenly" })}
`;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  row-gap: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  // ${md({ justifyContent: "space-evenly" })}
`;
const Title = styled.h1`
  color: teal;
  margin-bottom: 30px;
  font-size: 50px;
`;

const ProductSkeleton = () => (
  <SkeletonContainer>
    <SkeletonImage />
    <SkeletonText />
  </SkeletonContainer>
);

const SkeletonContainer = styled.div`
  width: 250px;
  height: 350px;
  background: #f2f2f2;
  border-radius: 10px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 70%;
  background: #e0e0e0;
  border-radius: 10px;
`;

const SkeletonText = styled.div`
  width: 60%;
  height: 20px;
  background: #d0d0d0;
  margin: 10px auto;
  border-radius: 5px;
`;

const Products = ({ cat, filters, sort, Url }) => {
  // console.log(Url)
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-api-b9k7.onrender.com/api/products?category=${cat}`
            : "https://ecommerce-api-b9k7.onrender.com/api/products",
        );
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
    // console.log(products)
  }, [cat]);

  useEffect(() => {
    if (cat || Url === "productsmenu")
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value),
          ),
        ),
      );
  }, [products, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    }
  }, [sort]);

  return (
    <Container>
      {Url === "homeProduct" ? <Title>Latest Products</Title> : ""}
      <Wrapper>
        {cat || Url === "productsmenu"
          ? isFetching
            ? Array(8)
                .fill()
                .map((_, i) => <ProductSkeleton key={i} />)
            : filteredProducts.map((item) => (
                <Product
                  item={item}
                  key={item._id}
                />
              ))
          : Url === "homeProduct"
            ? products?.slice(0, 5).map((item) => (
                <Product
                  item={item}
                  key={item.id}
                />
              ))
            : products?.map((item) => (
                <Product
                  item={item}
                  key={item.id}
                />
              ))}
      </Wrapper>
    </Container>
  );
};

export default Products;
