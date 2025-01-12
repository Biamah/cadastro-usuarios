const apiUrl = "http://localhost:8000/api/users";

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

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!validateEmail(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  if (!name || !email || !password) {
    alert("Todos os campos são obrigatórios.");
    return;
  }
  if (password.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    // Verifica se houve erro na requisição
    if (!response.ok) {
      const errorData = await response.json();

      // Exibe mensagens específicas baseadas nos erros retornados pelo backend
      if (errorData.errors) {
        const errorMessages = Object.entries(errorData.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        alert("Erro ao adicionar usuário:\n" + errorMessages);
      } else {
        alert(
          "Erro ao adicionar usuário. Verifique se seu email e senha estão corretos, e tente novamente."
        );
      }
      return;
    }

    // Recarrega os usuários após adicionar
    loadUsers();
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    alert("Erro ao conectar ao servidor.");
  }
});

// Excluir um usuário
async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      alert("Usuário excluído com sucesso!");
      location.reload(); // Atualiza a lista de usuários
    } else {
      alert("Erro ao excluir usuário.");
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    alert("Erro ao conectar ao servidor.");
  }
}

// Editar um usuário
async function editUser(id) {
  const name = prompt("Novo nome:");
  const email = prompt("Novo email:");

  // Validação do email ao editar
  if (!validateEmail(email)) {
    alert("Por favor, insira um email válido.");
    return; // Impede a edição se o email for inválido
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    // Verifica se houve erro na requisição
    if (!response.ok) {
      const errorData = await response.json();

      // Exibe mensagens específicas baseadas nos erros retornados pelo backend
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors).flat().join("\n");
        alert("Erro ao editar usuário:\n" + errorMessages);
      } else {
        alert("Erro ao editar usuário.");
      }
      return;
    }

    // Recarrega os usuários após editar
    loadUsers();
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    alert("Erro ao conectar ao servidor.");
  }
}

window.deleteUser = deleteUser;
window.editUser = editUser;
