import "./App.css";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/create" element={<CreateProductPage />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
