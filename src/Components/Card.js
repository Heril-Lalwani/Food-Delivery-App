import React from "react";

const Card = (props) => {
  let options = props.options;
  console.log(typeof options);
  // let as = options['half'];
  // console.log(as);
  
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <div className="card-body">
          <h6>{props.category}</h6>
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              style={{ select: "#FF0000" }}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            
            <select className="m-2 h-100 w-20 bg-success text-black rounded">
                  
                </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">{props.price}/-</div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
