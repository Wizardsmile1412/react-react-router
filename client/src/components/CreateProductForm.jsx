import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProductForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const setData = async () => {
    try {
      const data = {
        name,
        price,
        image,
        description,
      };
      const response = await axios.post("http://localhost:4001/products", data);

      if (response.status === 201 || response.status === 200) {
        alert("Product created successfully!");
        clearForm(); // ล้างค่าฟอร์มหลังบันทึก
        navigate("/"); // Redirect ไปหน้าอื่น (ปรับตาม Route ของคุณ)
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("Failed to create product.");
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
    if (!name || !image || !price || !description) {
      alert("Please fill in all fields.");
      return;
    }
    setData();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image URL
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image URL here"
            onChange={(e) => setImage(e.target.value)}
            value={image}
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
            value={price}
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
            value={description}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
