export const fetchDashboardInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to fetch dashboard info");
    }

    return await res.json(); // e.g. { name: "John Doe", email: "john@example.com" }
  } catch (error) {
    console.error("Dashboard service error:", error);
    throw error;
  }
};
