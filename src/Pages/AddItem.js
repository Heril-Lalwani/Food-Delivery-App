import React, { useState } from 'react';

const AddItem = () => {
  const [newItem, setNewItem] = useState({
    foodName: "",
    price: "",
    category: "",
  });

  const [formError, setFormError] = useState(null);

  const handleFormChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!newItem.foodName || !newItem.price || !newItem.category) {
      setFormError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message || "Failed to add new item.");
        return;
      }

      const addedItem = await response.json();
      alert(`Item added: ${addedItem.foodName}`);
      setNewItem({ foodName: "", price: "", category: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding new item:", error);
      setFormError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Add New Food Item</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="foodName" className="form-label">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            className="form-control"
            value={newItem.foodName}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={newItem.price}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={newItem.category}
            onChange={handleFormChange}
          />
        </div>
        {formError && <div className="alert alert-danger">{formError}</div>}
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
