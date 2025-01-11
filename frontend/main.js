const apiUrl = "http://localhost:8000/api/users";

// Carregar usuários ao carregar a página
document.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  users.forEach((user) => {
    tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">Editar</button>
                    <button onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            </tr>`;
  });
}

// Adicionar um novo usuário
document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  loadUsers();
});

// Excluir um usuário
async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadUsers();
}

// Editar um usuário
async function editUser(id) {
  const name = prompt("Novo nome:");
  const email = prompt("Novo email:");

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  loadUsers();
}
