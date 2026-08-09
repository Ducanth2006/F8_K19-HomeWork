import { API_URL } from "../api";

export const customerApi = {
  async getAll() {
    const res = await fetch(API_URL);
    return await res.json();
  },

  async create(data) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async update(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async delete(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
  }
};