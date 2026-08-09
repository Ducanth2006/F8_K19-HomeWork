export const ui = {
  renderCustomers(customers, onEdit, onDelete) {
    const tbody = document.getElementById("customer-list");
    tbody.innerHTML = "";

    customers.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${item.id}</strong></td>
        <td>${item.companyName}</td>
        <td>
          <div>${item.email}</div>
          <small>${item.phone}</small>
        </td>
        <td>${item.address}</td>
        <td>${item.taxId}</td>
        <td><span class="badge ${item.status.toLowerCase()}">${item.status}</span></td>
        <td class="actions">
          <button class="btn-edit">Sửa</button>
          <button class="btn-delete">Xóa</button>
        </td>
      `;

      tr.querySelector(".btn-edit").addEventListener("click", () => onEdit(item));
      tr.querySelector(".btn-delete").addEventListener("click", () => onDelete(item.id));

      tbody.appendChild(tr);
    });
  },

  fillForm(data) {
    document.getElementById("companyName").value = data.companyName;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("taxId").value = data.taxId;
    document.getElementById("address").value = data.address;
    document.getElementById("status").value = data.status;

    document.getElementById("submit-btn").textContent = "Cập nhật";
    document.getElementById("cancel-btn").style.display = "inline-block";
  },

  resetForm() {
    document.getElementById("customer-form").reset();
    document.getElementById("submit-btn").textContent = "Thêm mới";
    document.getElementById("cancel-btn").style.display = "none";
  }
};