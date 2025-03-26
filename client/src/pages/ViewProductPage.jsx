import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ViewProductPage() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const { productId } = useParams(); // Get "id" from URL

  const getProducts = async (productId) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await axios.get(
        `http://localhost:4001/products/${productId}`
      );

      setIsLoading(false);
      setProduct(response.data.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Failed to show product:", error);
    }
  };

  useEffect(() => {
    getProducts(productId);
  }, [productId]);

  return (
    <div>
      <div>
        <h1>View Product Page</h1>
        <div className="view-product-container">
          <h2>Name: {product.name}</h2>
          <p>{`${product.price} THB`}</p>
          <p>{product.description}</p>
        </div>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default ViewProductPage;
