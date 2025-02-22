const apiUrl = "http://localhost:8000/api/users";

// Detectar a página atual
const currentPage = window.location.pathname.split("/").pop();

// Função para validar email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Função para validar nome
function validateName(name) {
  return name && name.length >= 3;
}

// Função para validar senha
function validatePassword(password) {
  return password && password.length >= 6;
}

// Carregar usuários na página de listagem
if (currentPage === "list.html") {
  document.addEventListener("DOMContentLoaded", loadUsers);

  const editModal = document.getElementById("editModal");
  const closeModal = document.getElementById("closeModal");
  const editForm = document.getElementById("editForm");

  let userIdToEdit = null; // Armazena o ID do usuário sendo editado

  // Fechar o modal ao clicar no "X"
  closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Fechar o modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    }
  });

  async function loadUsers() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Erro ao carregar usuários.");

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
              <button onclick="openEditModal(${user.id}, '${user.name}', '${user.email}')">Editar</button>
              <button onclick="deleteUser(${user.id})">Excluir</button>
            </td>
          </tr>`;
      });
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários.");
    }
  }

  // Função para abrir o modal e preencher os campos
  window.openEditModal = function (id, name, email) {
    userIdToEdit = id;
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    editModal.style.display = "block";
  };

  // Submissão do formulário de edição
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("editName").value.trim();
    const email = document.getElementById("editEmail").value.trim();

    if (!validateName(name)) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${userIdToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        alert("Usuário atualizado com sucesso!");
        editModal.style.display = "none";
        loadUsers();
      } else {
        const errorData = await response.json();
        alert("Erro ao editar usuário: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });

  window.deleteUser = async function (userId) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`${apiUrl}/${userId}`, { method: "DELETE" });
      if (response.status === 204) {
        alert("Usuário excluído com sucesso!");
        loadUsers();
      } else {
        alert("Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  loadUsers();
}

// Cadastro de usuário na página de registro
if (currentPage === "index.html") {
  document.querySelector("#userForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // Validações
    if (!validateName(name)) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    if (!validatePassword(password)) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        document.querySelector("#userForm").reset();
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar usuário: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });
}
