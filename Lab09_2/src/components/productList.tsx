import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productAPI } from "../api/productService";
import type { Product } from "../interface/interface";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const load = () => productAPI.getAll().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá?")) return;
    await productAPI.delete(id);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product List</h1>
        <button
          onClick={() => navigate("/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + New
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2 w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">
                <Link to={`/detail/${p.id}`} className="text-blue-600">
                  {p.name}
                </Link>
              </td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/edit/${p.id}`)}
                  className="mr-2 text-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
