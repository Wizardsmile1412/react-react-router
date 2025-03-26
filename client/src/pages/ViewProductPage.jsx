import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewProductPage() {
  const { productId } = useParams(); // ดึง productId จาก URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data for Product ID:", productId); // ตรวจสอบค่า productId
      const response = await axios.get(`http://localhost:4001/products/${productId}`);
      console.log("Response data:", response.data); // ตรวจสอบข้อมูลที่ได้
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        {product ? (
          <>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width="200" />
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default ViewProductPage;
