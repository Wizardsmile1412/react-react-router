import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateProductForm from "../components/CreateProductForm";

function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/products", formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <CreateProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateProductPage;