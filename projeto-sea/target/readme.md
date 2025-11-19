# 🚀 Projeto SEA: Solução Full-Stack de E-commerce e Gestão de Clientes

Opa gente! Este projeto é a minha solução Full-Stack construída para unificar os requisitos do desafio de estágio  com o meu projeto final de faculdade (Loja Online). O foco foi na **modelagem de dados, na experiência do usuário (UX) e, principalmente, na estabilidade da API**.

## 🎯 Visão Geral do Projeto (O Conceito)

O sistema implementa o fluxo completo de um e-commerce: **Cadastro de Novo Cliente → Login → Redirecionamento baseado no `Role`**.

| Componente | Tecnologia | Foco |
| :--- | :--- | :--- |
| **Back-end** | Java 21, Spring Boot, Hibernate, Maven | Robustez da API e Persistência de Dados |
| **Banco de Dados** | MySQL 8.x | Armazenamento de `Cliente` (com todos os detalhes, senhas e permissões) |
| **Front-end** | React.js, Vite, Axios | Máscaras de input, roteamento e consumo eficiente da API |

***

## 🛠️ Decisões Técnicas no Back-end

A parte mais robusta é o Back-end, que eu construí em Java com Spring Boot. A minha prioridade máxima foi a **modelagem de dados** (por isso, a entidade `Cliente` é super detalhada, interligada ao Endereço, Telefones e E-mails).

### O PIVÔ: A Solução de Login Customizada

Você notará que eu optei por um login customizado (`LoginController.java`) em vez do padrão Spring Security.

* **O Problema:** O módulo Spring Security estava causando um **conflito de cache persistente** na minha máquina de desenvolvimento (um erro de senha aleatória) que impedia o build final.
* **A Solução Pragmática:** Para garantir a funcionalidade e a entrega a tempo, eu **removi a dependência problemática** e implementei uma "fechadura simples" que verifica o `admin` e `padrao` diretamente contra o banco. Isso garante que o projeto rode **limpo** e **sem erros** na sua máquina.

### ViaCEP e Persistência

* **ViaCEP:** Eu implementei uma chamada para a API ViaCEP no `ClienteService.java` para preencher logradouro, bairro e cidade automaticamente assim que o cliente digita o CEP.
* **Data Seeding:** O arquivo `DataInitializer.java` garante que o **Admin** (`000.000.000-00` / `123qwe!@#`) seja criado no banco na primeira execução do projeto.

***

## 🎨 O Foco no Front-end (UX e Requisitos)

O Front-end foi construído com React e Vite (que é super rápido!). Eu me concentrei em garantir uma ótima experiência, focando nos requisitos essenciais do estágio:

### 1. Máscaras e Limpeza de Dados
* Utilizei o **`react-imask`** para garantir que o usuário **veja a máscara** (CPF, CEP, Telefone), mas a função de envio garanta que o dado enviado para a API seja sempre **limpo** (somente números), conforme o requisito de persistência.
* A lógica para adicionar e remover **múltiplos Telefones e E-mails** (que são arrays no banco) foi toda feita no `App.jsx`, resultando em uma experiência de usuário limpa.

### 2. Autorização e Áreas Restritas
O sistema usa o Token (retornado da API) para gerenciar o que é visto:
* **Login Sucesso (Admin):** É direcionado para a **Área Administrativa** (`/admin`), onde pode visualizar a lista de todos os clientes no banco (consumindo a API `GET /api/clientes`).
* **Login Sucesso (Cliente):** É direcionado para a **Loja Online** (`/loja`), que exibe os produtos fictícios e a simulação das estrelinhas de avaliação.
* **Logout:** O botão "Sair" funciona perfeitamente, limpando o token e retornando o usuário para a tela de Login.

***

## 💻 Como Rodar o Projeto

1.  **Back-end (Java/API):**
    * Abra o terminal na pasta `PROJETO-SEA`.
    * Rode o MySQL e crie o banco de dados.
    * Execute o comando de inicialização: `.\mvnw.cmd spring-boot:run`
2.  **Front-end (React/Site):**
    * Abra um **novo** terminal na pasta `frontend-sea`.
    * Instale as dependências (se ainda não o fez): `npm install`
    * Inicie o servidor: `npm run dev`

### Credenciais de Teste

| Usuário | CPF (Login) | Senha | Acesso |
| :--- | :--- | :--- | :--- |
| **Admin (Gerencial)** | `000.000.000-00` | `123qwe!@#` | Área Admin (Lista de Clientes) |
| **Cliente (Padrão)** | (Qualquer CPF cadastrado) | (Senha cadastrada) | Apenas Loja | 

Obrigado pela atenção e pela oportunidade!!