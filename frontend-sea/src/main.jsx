import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'; // Nossa página de CADASTRO
import LoginPage from './LoginPage.jsx';
import LojaPage from './LojaPage.jsx'; 
import AdminPage from './AdminPage.jsx'; 

import { AuthProvider } from './AuthContext.jsx'; // Nosso gerenciador de login
import ProtectedRoute from './ProtectedRoute.jsx'; // <-- IMPORT NECESSÁRIO

import './index.css';

// 1. Define as rotas (páginas) do nosso site
const router = createBrowserRouter([
  {
    path: "/", // URL Raiz
    element: <LoginPage />, 
  },
  {
    path: "/cadastro", // URL /cadastro (para clientes novos)
    element: <App />, 
  },
  {
    path: "/loja", // URL /loja (para clientes logados)
    element: (
        // Rota Protegida: Requer login, mas não precisa ser Admin
        <ProtectedRoute isAdminRoute={false}> 
            <LojaPage />
        </ProtectedRoute>
    ), 
  },
  {
    path: "/admin", // URL /admin (para o admin logado)
    element: (
        // Rota Protegida: Requer login E PRECISA ser Admin
        <ProtectedRoute isAdminRoute={true}> 
            <AdminPage />
        </ProtectedRoute>
    ),
  },
]);

// 2. Inicia o aplicativo. A aplicação é envolvida pelo AuthProvider.
// (O AuthProvider deve envolver o Router, como está)
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <RouterProvider router={router} />
  </AuthProvider>
);