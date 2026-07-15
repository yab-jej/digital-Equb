// src/service/equbService.ts
import axios from "axios";

export type EqubPayload = {
  name: string;
  contribution: number;
  members: string[];
  admin: string;
  maxMembers: number;
  cycle: string; // must be "monthly"
  nextDraw: string; // ISO string
  policyAgreed: boolean;
};

export type EqubResponse = {
  success: boolean;
  equb: {
    _id: string;
    name: string;
    contribution: number;
    members: string[];
    admin: string;
    maxMembers: number;
    cycle: string;
    nextDraw: string;
    policyAgreed: boolean;
  };
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * API call to create a new Equb
 */
export const createEqubAPI = async (
  payload: EqubPayload,
  token: string
): Promise<EqubResponse> => {
  const response = await axios.post(`${API_BASE}/equbs/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
