// src/routes/equbRoutes.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/equbs";

export type Equb = {
  _id?: string;
  name: string;
  amount: number;
  members: string[];
  admin: string;
  status: string;
  cycle: string;
  nextDraw: string;
  policyAgreed: boolean;
};

// Fetch groups created by the logged-in user
export const fetchCreatedEqubs = async (token: string): Promise<Equb[]> => {
  const res = await axios.get<Equb[]>(`${API_URL}/created`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch groups where the user is a member
export const fetchActiveEqubs = async (token: string): Promise<Equb[]> => {
  const res = await axios.get<Equb[]>(`${API_URL}/active`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch groups where the user is neither admin nor member
export const fetchAvailableEqubs = async (token: string): Promise<Equb[]> => {
  const res = await axios.get<Equb[]>(`${API_URL}/available`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new Equb group
export const createEqub = async (data: Partial<Equb>, token: string) => {
  const res = await axios.post(`${API_URL}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
