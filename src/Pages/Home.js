import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Carousel />
      Home
      <div className="container"  >
        
           {Object.keys(foodCat).length >0
            ? foodCat.map((data) => (<div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                  </div>
                <hr/>
                {
                  foodItem.filter((item)=> item.CategoryName===data.CategoryName).map(filterItems=>{
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodName={filterItems.name} options={filterItems.options} imgScr={filterItems.img}></Card>
                      </div>
                    )
                  })
                }
               </div>
                ))
            : <div>No categories available</div>
          }
          
                <Card />
      </div>
    </div>
  );
};

export default Home;
