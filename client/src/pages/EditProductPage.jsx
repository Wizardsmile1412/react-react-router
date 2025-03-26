import EditProductForm from "../components/EditProductForm";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function EditProductPage() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { productId } = useParams();

  const navigate = useNavigate();

  const editProduct = async (id, editProductInfo) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await axios.put(`http://localhost:4001/products/${id}`, editProductInfo);

      setIsLoading(false);
      navigate("/"); // ✅ Redirect after successful creation
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Failed to edit product:", error);
    }
  };
  // Function to receive data from child component
  const handleProductEdit = (product) => {
    // console.log("Editing product with ID:", productId, "New Data:", product); // ✅ Debugging
    editProduct(productId, product);
  };

  return (
    <div>
      <div>
        <h1>Edit Product Page</h1>
        <EditProductForm onEditProduct={handleProductEdit} />
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default EditProductPage;
