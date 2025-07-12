import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/productList";
import ProductDetail from "./components/productDetail";
import ProductForm from "./components/productForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/new" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}
