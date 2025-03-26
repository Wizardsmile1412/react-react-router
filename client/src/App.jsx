import "./App.css";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage"
import ViewProductPage from "./pages/ViewProductPage"
import EditProductPage from "./pages/EditProductPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/create" element={<CreateProductPage />}/>
      <Route path="/view/:productId" element={<ViewProductPage />}/>
      <Route path="/edit/:productId" element={<EditProductPage />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
