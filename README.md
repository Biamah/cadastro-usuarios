# Cadastro de Usuários

Este é um projeto simples de gerenciamento de usuários, onde é possível realizar as operações de criação, listagem, edição e exclusão de usuários. O backend é desenvolvido com **Laravel** e o frontend é composto por **HTML**, **CSS** e **JavaScript**.

## Tecnologias Utilizadas

### Frontend:

- HTML
- CSS
- JavaScript (Fetch API)

### Backend:

- Laravel (PHP)
- MySQL (Banco de Dados)

## Funcionalidades

- **Cadastrar usuários**: Permite adicionar novos usuários ao banco de dados.
- **Listar usuários**: Exibe todos os usuários cadastrados.
- **Editar usuários**: Permite editar o nome e o e-mail de um usuário.
- **Excluir usuários**: Permite excluir um usuário do banco de dados.

## Pré-requisitos

Antes de executar o projeto, é necessário ter os seguintes requisitos instalados no seu sistema:

- **PHP** (versão 8.1 ou superior)
- **Composer** (gerenciador de dependências do PHP)
- **Node.js** (para a execução do frontend)
- **MySQL** (ou qualquer outro banco de dados compatível com Laravel)

## Como Rodar o Backend (Laravel)

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/cadastro-usuarios.git
cd cadastro-usuarios/backend
```

### 2. Instale as dependências do Laravel:

No terminal, dentro da pasta `backend`, execute:

```bash
composer install
```

### 3. Configuração do Banco de Dados:

- Crie um banco de dados MySQL chamado `user_management` (ou o nome que preferir).
- No arquivo `.env` do Laravel, configure as credenciais do banco de dados:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=user_management
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Execute as migrações do banco de dados:

```bash
php artisan migrate
```

### 5. Inicie o servidor do Laravel:

```bash
php artisan serve
```

O backend estará rodando em `http://localhost:8000`.

## Como Rodar o Frontend (HTML, CSS, JavaScript)

### 1. Instale as dependências do frontend (se necessário):

Se você precisar de pacotes como o axios ou outras dependências JavaScript, execute:

```bash
npm install
```

### 2. Abra o arquivo `index.html` no seu navegador. O frontend estará disponível em `file://` ou você pode configurar um servidor local para servir o HTML.

## Como usar

### 1. Adicionar um usuário:

- Preencha o formulário no frontend e clique em "Adicionar".
- O usuário será adicionado ao banco de dados.

### 2. Listar usuários:

- A lista de usuários será carregada automaticamente ao carregar a página ou após adicionar/editar/excluir um usuário.

### 3. Editar um usuário:

- Clique no botão "Editar" ao lado de um usuário para modificar seu nome e e-mail.

### 4. Excluir um usuário:

- Clique no botão "Excluir" ao lado de um usuário para removê-lo do banco de dados.

## Exemplo de Estrutura de Pastas

```plaintext
├── backend
│   ├── app
│   ├── database
│   ├── resources
│   ├── routes
│   ├── .env
│   ├── composer.json
│   └── ...
├── frontend
│   ├── index.html
│   ├── list.html
│   ├── main.js
│   ├── style.css
│   └── ...
├── README.md
└── .gitignore
```
