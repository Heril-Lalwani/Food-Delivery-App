import "./App.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you import Bootstrap CSS

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AddItem from "./Pages/AddItem"; // Import the new AddItem component

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-item" element={<AddItem />} /> {/* Add route for AddItem */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
