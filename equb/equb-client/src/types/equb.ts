// src/types/equb.ts
export interface EqubData {
  name: string;
  contribution: number;       // matches backend
  members: string[];          // array of user IDs
  admin: string;              // creator/admin ID
  maxMembers: number;
  policyAgreed: boolean;
  cycle?: string;
  nextDraw?: string;
}

export interface Equb extends EqubData {
  _id: string;
  status: string;
}
