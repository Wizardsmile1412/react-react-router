import { useState } from "react";

function CreateProductForm({ onSubmitProduct }) {
  const [productInfo, setProductInfo] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  // Handle input change
  const handleProductInfo = (e) => {
    const {name, value} = e.target;
    setProductInfo((prevdata)=> ({
      ...prevdata,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProduct(productInfo); // Send data to CreateProductPage
    setProductInfo({
    name: "",
    image: "",
    price: null,
    description: "",
    })
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
            value={productInfo.name}
            onChange={handleProductInfo}
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
            value={productInfo.image}
            onChange={handleProductInfo}
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
            value={productInfo.price}
            onChange={handleProductInfo}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={productInfo.description}
            onChange={handleProductInfo}
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
