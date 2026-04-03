const API_BASE_URL = "http://localhost:5000/api";

const totalCustomersEl = document.getElementById("totalCustomers");
const totalInteractionsEl = document.getElementById("totalInteractions");
const totalTasksEl = document.getElementById("totalTasks");
const totalNewCustomersEl = document.getElementById("totalNewCustomers");
const dashboardMessageEl = document.getElementById("dashboardMessage");
const refreshDashboardBtn = document.getElementById("refreshDashboardBtn");

async function loadDashboardSummary() {
  try {
    if (dashboardMessageEl) {
      dashboardMessageEl.textContent = "Loading dashboard data...";
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/summary`);

    if (!response.ok) {
      throw new Error("Failed to load dashboard summary.");
    }

    const data = await response.json();

    if (totalCustomersEl) {
      totalCustomersEl.textContent = data.totalCustomers ?? 0;
    }

    if (totalInteractionsEl) {
      totalInteractionsEl.textContent = data.totalInteractions ?? 0;
    }

    if (totalTasksEl) {
      totalTasksEl.textContent = data.totalTasks ?? 0;
    }

    if (totalNewCustomersEl) {
      totalNewCustomersEl.textContent = data.totalNewCustomers ?? 0;
    }

    if (dashboardMessageEl) {
      dashboardMessageEl.textContent = "";
    }
  } catch (error) {
    if (totalCustomersEl) totalCustomersEl.textContent = "-";
    if (totalInteractionsEl) totalInteractionsEl.textContent = "-";
    if (totalTasksEl) totalTasksEl.textContent = "-";
    if (totalNewCustomersEl) totalNewCustomersEl.textContent = "-";

    if (dashboardMessageEl) {
      dashboardMessageEl.textContent = "Cannot load dashboard data.";
    }

    console.error("Dashboard error:", error);
  }
}

if (refreshDashboardBtn) {
  refreshDashboardBtn.addEventListener("click", loadDashboardSummary);
}

loadDashboardSummary();