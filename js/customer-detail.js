const API_BASE_URL = "http://localhost:5000/api";

const customerInfoEl = document.getElementById("customerInfo");
const interactionListEl = document.getElementById("interactionList");
const taskListEl = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const taskFormMessageEl = document.getElementById("taskFormMessage");
const interactionForm = document.getElementById("interactionForm");
const formMessageEl = document.getElementById("formMessage");
const editCustomerBtn = document.getElementById("editCustomerBtn");
const pageSubtitleEl = document.getElementById("pageSubtitle");

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

function getCustomerName(customer) {
  return customer.full_name || customer.name || "";
}

function getStatusBadge(status) {
  if (!status) return `<span class="badge badge-neutral">Unknown</span>`;

  const statusClassMap = {
    New: "badge badge-neutral",
    Contacted: "badge badge-info",
    Interested: "badge badge-warning",
    Purchased: "badge badge-success",
    Inactive: "badge badge-danger"
  };

  return `<span class="${statusClassMap[status] || "badge"}">${status}</span>`;
}

function getTaskStageBadge(stage) {
  if (!stage) return `<span class="badge badge-neutral">Unknown</span>`;

  const stageClassMap = {
    "To Do": "badge badge-warning",
    "In Progress": "badge badge-info",
    Done: "badge badge-success"
  };

  return `<span class="${stageClassMap[stage] || "badge badge-neutral"}">${stage}</span>`;
}

function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleString();
}

function formatTaskDate(dateString) {
  if (!dateString) return "N/A";

  const raw = typeof dateString === "string" ? dateString.slice(0, 10) : null;
  if (!raw) return "N/A";

  const [year, month, day] = raw.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

if (!customerId) {
  if (customerInfoEl) {
    customerInfoEl.innerHTML = "<p class='table-message'>Customer ID is missing in URL.</p>";
  }

  if (interactionListEl) {
    interactionListEl.innerHTML = "<p class='table-message'>Cannot load interactions.</p>";
  }

  if (taskListEl) {
    taskListEl.innerHTML = "<p class='table-message'>Cannot load follow-up tasks.</p>";
  }
} else {
  if (editCustomerBtn) {
    editCustomerBtn.href = `customer-form.html?id=${customerId}`;
  }

  loadCustomerDetail();
  loadInteractions();
  loadTasks();
}

async function loadCustomerDetail() {
  if (!customerInfoEl) return;

  try {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}`);

    if (!response.ok) {
      throw new Error("Failed to load customer detail.");
    }

    const customer = await response.json();
    const displayName = getCustomerName(customer);

    customerInfoEl.innerHTML = `
      <p><strong>ID:</strong> ${customer.id ?? ""}</p>
      <p><strong>Name:</strong> ${displayName}</p>
      <p><strong>Email:</strong> ${customer.email ?? ""}</p>
      <p><strong>Phone:</strong> ${customer.phone ?? ""}</p>
      <p><strong>Status:</strong> ${getStatusBadge(customer.status)}</p>
      <p><strong>Company:</strong> ${customer.company ?? "N/A"}</p>
      <p><strong>Address:</strong> ${customer.address ?? "N/A"}</p>
    `;

    if (pageSubtitleEl) {
      pageSubtitleEl.textContent = `Viewing detail for ${displayName || "customer"}`;
    }
  } catch (error) {
    customerInfoEl.innerHTML = `<p class='table-message'>${error.message}</p>`;
  }
}

async function loadInteractions() {
  if (!interactionListEl) return;

  try {
    const response = await fetch(`${API_BASE_URL}/interactions/customer/${customerId}`);

    if (!response.ok) {
      throw new Error("Failed to load interactions.");
    }

    const interactions = await response.json();

    if (!Array.isArray(interactions) || interactions.length === 0) {
      interactionListEl.innerHTML =
        `<p class="table-message">No interactions found for this customer.</p>`;
      return;
    }

    interactionListEl.innerHTML = interactions.map((item) => {
      return `
        <div class="activity-item">
          <p><strong>Type:</strong> ${item.type ?? "N/A"}</p>
          <p><strong>Note:</strong> ${item.content ?? item.note ?? "No content"}</p>
          <p><strong>Date:</strong> ${formatDate(item.created_at)}</p>
        </div>
      `;
    }).join("");
  } catch (error) {
    interactionListEl.innerHTML = `<p class='table-message'>${error.message}</p>`;
  }
}

async function loadTasks() {
  if (!taskListEl) return;

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/customer/${customerId}`);

    if (!response.ok) {
      throw new Error("Failed to load follow-up tasks.");
    }

    const tasks = await response.json();

    if (!Array.isArray(tasks) || tasks.length === 0) {
      taskListEl.innerHTML =
        `<p class="table-message">No follow-up tasks found for this customer.</p>`;
      return;
    }

    taskListEl.innerHTML = tasks.map((task) => {
      return `
        <div class="task-item">
          <p><strong>Title:</strong> ${task.title ?? "N/A"}</p>
          <p><strong>Description:</strong> ${task.description || "No description."}</p>
          <p><strong>Due Date:</strong> ${formatTaskDate(task.due_date)}</p>
          <p><strong>Stage:</strong> ${getTaskStageBadge(task.stage)}</p>
          ${
            task.stage !== "Done"
              ? `<button class="btn btn-secondary" onclick="markTaskCompleted(${task.id})">Mark as Completed</button>`
              : ""
          }
        </div>
      `;
    }).join("");
  } catch (error) {
    taskListEl.innerHTML = `<p class='table-message'>${error.message}</p>`;
  }
}

if (taskForm) {
  taskForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const dueDate = document.getElementById("taskDueDate").value;

    if (taskFormMessageEl) {
      taskFormMessageEl.textContent = "";
      taskFormMessageEl.classList.remove("success-message");
    }

    if (!title || !dueDate) {
      if (taskFormMessageEl) {
        taskFormMessageEl.textContent = "Please fill in all task fields.";
      }
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          title: title,
          due_date: dueDate,
          stage: "To Do"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add task.");
      }

      taskForm.reset();

      if (taskFormMessageEl) {
        taskFormMessageEl.textContent = "Task added successfully.";
        taskFormMessageEl.classList.add("success-message");
      }

      loadTasks();
    } catch (error) {
      if (taskFormMessageEl) {
        taskFormMessageEl.textContent = error.message;
      }
      console.error("Add task error:", error);
    }
  });
}

async function markTaskCompleted(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
      method: "PUT"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update task.");
    }

    loadTasks();
  } catch (error) {
    console.error("Complete task error:", error);
    alert(error.message || "Failed to update task.");
  }
}

window.markTaskCompleted = markTaskCompleted;

if (interactionForm) {
  interactionForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const type = document.getElementById("interactionType").value.trim();
    const note = document.getElementById("interactionNote").value.trim();

    if (formMessageEl) {
      formMessageEl.textContent = "";
      formMessageEl.classList.remove("success-message");
    }

    if (!type || !note) {
      if (formMessageEl) {
        formMessageEl.textContent = "Please fill in all fields.";
      }
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/interactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          type: type,
          content: note
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add interaction.");
      }

      interactionForm.reset();

      if (formMessageEl) {
        formMessageEl.textContent = "Interaction added successfully.";
        formMessageEl.classList.add("success-message");
      }

      loadInteractions();
    } catch (error) {
      if (formMessageEl) {
        formMessageEl.textContent = error.message;
      }
      console.error("Add interaction error:", error);
    }
  });
}