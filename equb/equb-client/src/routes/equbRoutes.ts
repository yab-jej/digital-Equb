// src/routes/equbRoutes.ts
import type { EqubPayload, EqubResponse } from "../service/equbService";
import { createEqubAPI } from "../service/equbService";

export const createNewEqub = async (
  payload: EqubPayload,
  token: string
): Promise<EqubResponse> => {
  try {
    const res = await createEqubAPI(payload, token);
    if (!res.success) throw new Error("Equb creation failed");
    return res;
  } catch (error: unknown) {
    let message = "Failed to create Equb";

    if (error instanceof Error) message = error.message;
    else if (typeof error === "object" && error !== null && "message" in error)
      message = (error as { message: string }).message;

    console.error("Equb creation error:", error);
    throw new Error(message);
  }
};
