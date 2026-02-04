# Conecthus - Avaliação Fullstack

Sistema de gerenciamento de usuários com interface administrativa.

## Tecnologias

**Backend:**
- NestJS
- Prisma ORM
- MySQL
- TypeScript

**Frontend:**
- React 18
- TypeScript
- React Router
- Axios
- Zod (validação)
- React Toastify

## 📋 Funcionalidades

- ✅ Listagem de usuários com paginação e busca
- ✅ Cadastro de novos usuários
- ✅ Edição de usuários
- ✅ Visualização de detalhes
- ✅ Exclusão de usuários
- ✅ Validação de formulários
- ✅ Notificações toast

## ⚙️ Configuração

### Backend

```bash
cd backend
npm install
```

Configure o arquivo `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/wenlock"
```

Execute as migrações:
```bash
npm run migrate:dev
```

Inicie o servidor:
```bash
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
```

Configure o arquivo `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Inicie o aplicativo:
```bash
npm run dev
```

## 📁 Estrutura

```
conecthus/
├── backend/          # API NestJS
│   ├── prisma/      # Schema e migrations
│   └── src/         # Código fonte
└── frontend/        # Interface React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── schemas/
    └── public/
```

## 🔐 Campos do Usuário

- **Nome**: Máximo 30 caracteres, apenas letras
- **Matrícula**: 4 a 10 dígitos
- **Email**: Formato válido, máximo 40 caracteres
- **Senha**: Mínimo 6 caracteres alfanuméricos

## 🌐 Endpoints da API

- `GET /users` - Lista usuários (paginado)
- `GET /users/:id` - Busca usuário por ID
- `POST /users` - Cria novo usuário
- `PATCH /users/:id` - Atualiza usuário
- `DELETE /users/:id` - Remove usuário
