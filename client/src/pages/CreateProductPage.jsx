import CreateProductForm from "../components/CreateProductForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateProductPage() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const createProduct = async (productInfo) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await axios.post("http://localhost:4001/products", productInfo);

      setIsLoading(false);
      navigate("/"); // ✅ Redirect after successful creation
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Failed to create product:", error);
    }
  };

  // Function to receive data from child component
  const handleProductSubmit = (product) => {
    createProduct(product);
  };

  return (
    <div>
      <div>
        <h1>Create Product Page</h1>
        <CreateProductForm onSubmitProduct={handleProductSubmit} />
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default CreateProductPage;
