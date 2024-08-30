import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";
import { Link } from "react-router-dom";
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [categories, setCategories] = useState([]); // Categories state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category state

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/foodData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setFoodItems(data);
        setFilteredItems(data);

        // Extract unique categories from the fetched data
        const uniqueCategories = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } else {
        console.error("Expected array but got:", data);
        setFoodItems([]);
        setFilteredItems([]);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      setError("Failed to load food items.");
      setFoodItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredItems(foodItems);
    } else {
      setFilteredItems(foodItems.filter(item => item.category === category));
    }
  };

  return (
    <div>
      <Carousel />
      <h1>Home</h1>
      <div className="container">
        <div className="m-3">
          <label htmlFor="categoryFilter" className="form-label">
            Filter by Category
          </label>
          <select
            id="categoryFilter"
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Link to AddItem page */}
        <div className="m-3">
          <Link to="/add-item" className="btn btn-primary">
            Add New Item
          </Link>
        </div>
        
        {loading && <div>Loading...</div>} {/* Show loading message */}
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
        
        <div className="food-items-container">
          {!loading && !error && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item._id}
                foodName={item.foodName}
                price={item.price}
                category={item.category}
              />
            ))
          ) : (
            !loading && <div>No food items available</div> // Show message when no items are available
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
