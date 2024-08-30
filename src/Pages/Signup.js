import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Import and initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailadd: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json(); // Define json here

      if (response.ok && json.success) {
        localStorage.setItem("authToken", json.token); // Make sure your backend sends a token
        console.log(localStorage.getItem("authToken"));
        alert("Successfully created an account!");
        navigate('/'); // Redirect to home or another page
      } else {
        alert(json.message || "Failed to create the user. Check your input and try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <h1>New User</h1>
        <form
          className="w-50 m-auto mt-5 border bg-light border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="m-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              required
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
