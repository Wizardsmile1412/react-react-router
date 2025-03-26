import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { productId } = useParams(); // ดึงค่า productId จาก URL

  // ฟังก์ชันในการดึงข้อมูลสินค้าปัจจุบันจาก API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product data for ID:", productId); // ตรวจสอบว่า productId ถูกต้อง
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        const product = response.data.data;

        console.log("Fetched product data:", product); // ตรวจสอบข้อมูลที่ได้จาก API
        // ตั้งค่า state ด้วยข้อมูลที่ดึงมา
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setDescription(product.description);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Failed to fetch product data.");
      }
    };
    if (productId) {  // เช็คว่า productId มีค่า
      fetchProduct();
    }
  }, [productId]); // เมื่อ `productId` เปลี่ยน, จะดึงข้อมูลใหม่

  const setData = async () => {
    try {
      // สร้างอ็อบเจ็กต์ใหม่ที่จะส่งไปพร้อมกับการอัพเดต
      const newData = {
        name,
        price,
        image,
        description,
      };

      const response = await axios.put(`http://localhost:4001/products/${productId}`, newData);

      // ตรวจสอบการตอบกลับจาก API
      if (response.status >= 200 && response.status < 300) {
        alert("Product updated successfully!");
        clearForm(); // ล้างฟอร์มหลังการอัพเดต
        navigate("/"); // Redirect ไปหน้าอื่น
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("Failed to Update product.");
    }
  };

  const clearForm = () => {
    setName("");
    setImage("");
    setPrice("");
    setDescription("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(e) => setName(e.target.value)}
            value={name}  // ค่าเก่าจะแสดงที่นี่
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={(e) => setImage(e.target.value)}
            value={image}  // ค่าเก่าจะแสดงที่นี่
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={(e) => setPrice(e.target.value)}
            value={price}  // ค่าเก่าจะแสดงที่นี่
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}  // ค่าเก่าจะแสดงที่นี่
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
