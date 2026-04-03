const API_BASE_URL = "http://localhost:5000/api";

const customerForm = document.getElementById("customerForm");
const fullNameInput = document.getElementById("full_name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const sourceInput = document.getElementById("source");
const lastContactInput = document.getElementById("last_contact");
const nextFollowUpInput = document.getElementById("next_follow_up");

const customerFormMessage = document.getElementById("customerFormMessage");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const saveCustomerBtn = document.getElementById("saveCustomerBtn");

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

function formatDateForInput(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function loadCustomerForEdit(id) {
  try {
    if (customerFormMessage) {
      customerFormMessage.textContent = "Loading customer data...";
    }

    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    const customer = await response.json();

    if (!response.ok) {
      if (customerFormMessage) {
        customerFormMessage.textContent =
          customer.message || "Failed to load customer.";
      }
      return;
    }

    const displayName = customer.full_name || customer.name || "";

    if (fullNameInput) fullNameInput.value = displayName;
    if (emailInput) emailInput.value = customer.email || "";
    if (phoneInput) phoneInput.value = customer.phone || "";
    if (sourceInput) sourceInput.value = customer.source || "";
    if (lastContactInput) {
      lastContactInput.value = formatDateForInput(customer.last_contact);
    }
    if (nextFollowUpInput) {
      nextFollowUpInput.value = formatDateForInput(customer.next_follow_up);
    }

    if (formTitle) {
      formTitle.textContent = "Edit Customer";
    }

    if (formSubtitle) {
      formSubtitle.textContent = "Update customer information and save changes.";
    }

    if (saveCustomerBtn) {
      saveCustomerBtn.textContent = "Update Customer";
    }

    if (customerFormMessage) {
      customerFormMessage.textContent = "";
    }
  } catch (error) {
    if (customerFormMessage) {
      customerFormMessage.textContent = "Cannot connect to server.";
    }
    console.error(error);
  }
}

if (customerId) {
  loadCustomerForEdit(customerId);
}

if (customerForm) {
  customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = fullNameInput ? fullNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const source = sourceInput ? sourceInput.value : "";
    const last_contact = lastContactInput ? lastContactInput.value : "";
    const next_follow_up = nextFollowUpInput ? nextFollowUpInput.value : "";

    if (!full_name || !email) {
      if (customerFormMessage) {
        customerFormMessage.textContent = "Full name and email are required.";
      }
      return;
    }

    if (customerFormMessage) {
      customerFormMessage.textContent = customerId
        ? "Updating customer..."
        : "Saving customer...";
    }

    try {
      let url = `${API_BASE_URL}/customers`;
      let method = "POST";

      if (customerId) {
        url = `${API_BASE_URL}/customers/${customerId}`;
        method = "PUT";
      }

      const payload = {
        full_name,
        name: full_name,
        email,
        phone,
        source,
        last_contact: last_contact || null,
        next_follow_up: next_follow_up || null
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to save customer.");
      }

      if (customerFormMessage) {
        customerFormMessage.textContent = customerId
          ? "Customer updated successfully!"
          : "Customer added successfully!";
      }

      setTimeout(() => {
        window.location.href = "customers.html";
      }, 1000);
    } catch (error) {
      if (customerFormMessage) {
        customerFormMessage.textContent = error.message;
      }
      console.error("Save customer error:", error);
    }
  });
}