import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4001/products");
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleCreateProduct = () => {
    navigate("/product/create"); // Navigate to Create Product Page
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/view/${productId}`); // Navigate to View Product Page with productId
  };
  const handleEditProduct = (productId) => {
    navigate(`/product/edit/${productId}`); // Navigate to Edit Product Page with productId
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`); // Delete product from server
      setProducts(products.filter((product) => product.id !== productId)); // Update state to remove deleted product
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={handleCreateProduct}>Create Product</button> {/* Add onClick */}
      </div>
      <div className="product-list">
  {products.map((product) => {
    return (
      <div className="product" key={product.id}>
        <div className="product-preview">
          <img
            src={product.imageUrl || "https://via.placeholder.com/250/250"} // Use imageUrl from server or fallback to placeholder
            alt={product.name || "Product image"} // Use product name as alt text
            width="250"
            height="250"
          />
        </div>
        <div className="product-detail">
          <h1>Product name: {product.name} </h1>
          <h2>Product price: {product.price}</h2>
          <p>Product description: {product.description} </p>
          <div className="product-actions">
            <button className="view-button" onClick={() => handleViewProduct(product.id)}>
                View
              </button>
            <button className="edit-button" onClick={() => handleEditProduct(product.id)}>
                Edit
              </button>
          </div>
        </div>

        <button className="delete-button"
                onClick={() => handleDeleteProduct(product.id)}>x</button>
      </div>
    );
  })}
</div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
