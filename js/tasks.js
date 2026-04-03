const API_BASE_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {
  setupCreateTaskButton();
  loadTaskBoard();
});

function setupCreateTaskButton() {
  const createTaskBtn = document.querySelector(".topbar__actions .btn-primary");

  if (!createTaskBtn) return;

  createTaskBtn.addEventListener("click", () => {
    window.location.href = "customers.html";
  });
}

async function loadTaskBoard() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    if (!response.ok) {
      throw new Error("Failed to load tasks.");
    }

    const tasks = await response.json();

    renderTaskSummary(tasks);
    renderTaskBoard(tasks);
  } catch (error) {
    console.error("Load task board error:", error);

    const taskBoard = document.querySelector(".task-board");
    if (taskBoard) {
      taskBoard.innerHTML = `<p class="table-message">${error.message}</p>`;
    }
  }
}

function renderTaskSummary(tasks) {
  const summaryCards = document.querySelectorAll(".task-summary-card strong");
  if (summaryCards.length < 3) return;

  const pending = tasks.filter(
    (task) => task.stage === "To Do" || task.stage === "In Progress"
  ).length;

  const dueToday = tasks.filter(
    (task) =>
      getDateOnly(task.due_date) === getTodayDateOnly() &&
      task.stage !== "Done"
  ).length;

  const completed = tasks.filter((task) => task.stage === "Done").length;

  summaryCards[0].textContent = pending;
  summaryCards[1].textContent = dueToday;
  summaryCards[2].textContent = completed;
}

function renderTaskBoard(tasks) {
  const taskBoard = document.querySelector(".task-board");
  if (!taskBoard) return;

  const stages = ["To Do", "In Progress", "Done"];

  taskBoard.innerHTML = stages
    .map((stage) => {
      const stageTasks = tasks.filter((task) => task.stage === stage);

      return `
        <article class="task-column">
          <div class="task-column__header">
            <h3>${stage}</h3>
            <span>${stageTasks.length}</span>
          </div>
          ${
            stageTasks.length > 0
              ? stageTasks.map(renderTaskCard).join("")
              : `<p class="table-message">No tasks in this stage.</p>`
          }
        </article>
      `;
    })
    .join("");
}

function renderTaskCard(task) {
  return `
    <div class="task-card">
      <strong>${escapeHtml(task.title || "Untitled task")}</strong>
      <p>${escapeHtml(task.description || "No description.")}</p>
      <p><strong>Customer:</strong> ${escapeHtml(task.customer_name || "N/A")}</p>
      <div class="task-meta">
        <span>Due: ${formatTaskDate(task.due_date)}</span>
        <span class="badge ${getStatusBadgeClass(task.customer_status)}">
          ${escapeHtml(task.customer_status || "Unknown")}
        </span>
      </div>
      <div class="task-meta">
        <span><strong>Stage:</strong> ${escapeHtml(task.stage || "N/A")}</span>
      </div>
      ${renderTaskActions(task)}
    </div>
  `;
}

function renderTaskActions(task) {
  if (task.stage === "To Do") {
    return `
      <div class="task-actions">
        <button class="btn btn-secondary btn-small" onclick="updateTaskStage(${task.id}, 'In Progress')">
          Start
        </button>
        <button class="btn btn-primary btn-small" onclick="updateTaskStage(${task.id}, 'Done')">
          Mark Done
        </button>
      </div>
    `;
  }

  if (task.stage === "In Progress") {
    return `
      <div class="task-actions">
        <button class="btn btn-secondary btn-small" onclick="updateTaskStage(${task.id}, 'To Do')">
          Move Back
        </button>
        <button class="btn btn-primary btn-small" onclick="updateTaskStage(${task.id}, 'Done')">
          Mark Done
        </button>
      </div>
    `;
  }

  return `
    <div class="task-actions">
      <button class="btn btn-secondary btn-small" onclick="updateTaskStage(${task.id}, 'To Do')">
        Reopen
      </button>
    </div>
  `;
}

async function updateTaskStage(taskId, stage) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/stage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stage })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update task stage.");
    }

    loadTaskBoard();
  } catch (error) {
    console.error("Update task stage error:", error);
    alert(error.message || "Failed to update task stage.");
  }
}

function getStatusBadgeClass(status) {
  const map = {
    New: "badge-neutral",
    Contacted: "badge-info",
    Interested: "badge-warning",
    Purchased: "badge-success",
    Inactive: "badge-danger",
    Internal: "badge-outline"
  };

  return map[status] || "badge-outline";
}

function getTodayDateOnly() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateOnly(dateValue) {
  if (!dateValue) return "";

  if (typeof dateValue === "string") {
    return dateValue.slice(0, 10);
  }

  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTaskDate(dateValue) {
  const dateOnly = getDateOnly(dateValue);
  if (!dateOnly) return "N/A";

  const [year, month, day] = dateOnly.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.updateTaskStage = updateTaskStage;