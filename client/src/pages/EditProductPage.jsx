import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const { productId } = useParams(); // Get productId from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch product data when the component is mounted
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        setFormData(response.data.data); // Set the fetched product data to formData
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4001/products/${productId}`, formData); // Update product
      navigate("/"); // Redirect to Home Page after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Failed to load product details</h1>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <EditProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditProductPage;