import { type FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productAPI } from "../api/productService";
import type { Product } from "../interface/interface";

export default function ProductForm() {
  const { id } = useParams(); // có id → Edit, không id → New
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    brand: "",
    category: "",
  });

  useEffect(() => {
    if (id)
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      productAPI.getById(id).then(({ id: _id, ...rest }) => setForm(rest));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? +value : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // không trùng tên (khi tạo mới)
    if (!id) {
      const all = await productAPI.getAll();
      if (all.some((p) => p.name.toLowerCase() === form.name.toLowerCase())) {
        alert("Tên sản phẩm đã tồn tại!");
        return;
      }
    }

    if (id) {
      if (!window.confirm("Xác nhận cập nhật?")) return;
      await productAPI.update(id, form);
    } else {
      await productAPI.create(form);
      alert("submitted");
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "price", "brand", "category"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "price" ? "number" : "text"}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {id ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
}
