import { fetchDashboardInfo } from "../service/dashboardService";

export const getDashboard = async () => {
  return await fetchDashboardInfo();
};
