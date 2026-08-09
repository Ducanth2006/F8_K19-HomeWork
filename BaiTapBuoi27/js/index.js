import { customerApi } from "./api";
import { appState } from "./state";
import { ui } from "./ui";

const formEl = document.getElementById("customer-form");
const cancelBtn = document.getElementById("cancel-btn");

async function loadCustomers() {
  appState.customers = await customerApi.getAll();
  ui.renderCustomers(appState.customers, handleEdit, handleDelete);
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    companyName: document.getElementById("companyName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    taxId: document.getElementById("taxId").value.trim(),
    address: document.getElementById("address").value.trim(),
    status: document.getElementById("status").value
  };

  if (appState.currentEditId) {
    await customerApi.update(appState.currentEditId, formData);
    appState.currentEditId = null;
  } else {
    formData.id = `CUST-${Math.floor(100 + Math.random() * 900)}`;
    await customerApi.create(formData);
  }

  ui.resetForm();
  await loadCustomers();
});

function handleEdit(customer) {
  appState.currentEditId = customer.id;
  ui.fillForm(customer);
}

cancelBtn.addEventListener("click", () => {
  appState.currentEditId = null;
  ui.resetForm();
});

async function handleDelete(id) {
  if (confirm(`Bạn có chắc muốn xóa khách hàng ${id} không?`)) {
    await customerApi.delete(id);
    await loadCustomers();
  }
}

loadCustomers();