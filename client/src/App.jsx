import "./App.css";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import EditProductPage from "./pages/EditProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/create" element={<CreateProductPage />} />
        <Route path="/product/view/:productId" element={<ViewProductPage />} />
        <Route path="/product/edit/:productId" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
