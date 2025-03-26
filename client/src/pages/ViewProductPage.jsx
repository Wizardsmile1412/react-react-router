import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProductPage() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        setProduct(response.data.data); // Assume the API returns the product object
      } catch (error) {
        setIsError(true);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isError) {
    return <h1>Failed to load product details</h1>;
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ViewProductPage;