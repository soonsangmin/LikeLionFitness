import type { Product } from "../interface/interface";

const BASE_URL =
  "https://687076887ca4d06b34b6db53.mockapi.io/api/v1/ProductList"; 

export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
  },

  create: async (data: Omit<Product, "id">): Promise<Product> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: string, data: Omit<Product, "id">): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};
