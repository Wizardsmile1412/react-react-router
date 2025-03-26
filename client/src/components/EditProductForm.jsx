import { useState } from "react";

function EditProductForm({ onEditProduct }) {
  const [editProductInfo,setEditProductInfo] = useState({
    name: "",
    image: "",
    price: "",
    description: "",  
  })
  

  const handleEditProductInfo = (e) => {
    const {name, value} = e.target;
    setEditProductInfo((prevdata)=>({...prevdata, [name]: value,}))
  }

  // Function to receive data from child component
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProduct(editProductInfo);
    setEditProductInfo({
    name: "",
    image: "",
    price: "",
    description: "",
    })
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
            value={editProductInfo.name}
            onChange={handleEditProductInfo}
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
            value={editProductInfo.image}
            onChange={handleEditProductInfo}
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
            value={editProductInfo.price}
            onChange={handleEditProductInfo}
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
            value={editProductInfo.description}
            onChange={handleEditProductInfo}
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
