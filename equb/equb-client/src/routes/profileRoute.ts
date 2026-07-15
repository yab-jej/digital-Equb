// src/routes/profileRoute.ts
import { getProfile, updateProfile, withdrawBalance } from "../service/profileService.ts";

export const fetchUserProfile = async () => {
  try {
    return await getProfile();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const editUserProfile = async (updatedData: { name: string; email: string }) => {
  try {
    return await updateProfile(updatedData);
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export const handleWithdraw = async (amount: number, method: string) => {
  try {
    return await withdrawBalance(amount, method);
  } catch (error) {
    console.error("Failed to withdraw:", error);
    throw error;
  }
};
