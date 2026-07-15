// src/services/profileService.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/profile";

const getToken = () => localStorage.getItem("token");

export const getProfile = async () => {
  const token = getToken();
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (updatedData: { name: string; email: string }) => {
  const token = getToken();
  const response = await axios.put(API_URL, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const withdrawBalance = async (amount: number, method: string) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/withdraw`,
    { amount, paymentMethod: method },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
