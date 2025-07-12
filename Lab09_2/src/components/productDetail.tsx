import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../api/productService";
import type { Product } from "../interface/interface";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) productAPI.getById(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p>
        <b>Price:</b> ${product.price}
      </p>
      <p>
        <b>Brand:</b> {product.brand}
      </p>
      <p>
        <b>Category:</b> {product.category}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
