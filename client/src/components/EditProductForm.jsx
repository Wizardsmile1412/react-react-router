import React from "react";

function EditProductForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name} // Pre-fill with existing data
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price} // Pre-fill with existing data
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea
          name="description"
          value={formData.description} // Pre-fill with existing data
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl} // Pre-fill with existing data
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditProductForm;