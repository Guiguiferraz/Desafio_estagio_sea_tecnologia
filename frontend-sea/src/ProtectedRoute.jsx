import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Pega o estado do usuário

// Este componente verifica se o usuário está logado
const ProtectedRoute = ({ children, isAdminRoute }) => {
    // 1. Pega o estado de autenticação (se está logado e qual o role)
    const { user, isAdmin } = useAuth();
    
    // 2. Se não houver 'crachá' (não logado), redireciona para a página de login (/)
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // 3. Se for uma rota de Admin (isAdminRoute é 'true'),
    //    mas o usuário logado NÃO for o Admin (isAdmin é 'false'),
    //    redireciona para a Loja.
    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/loja" replace />;
    }

    // 4. Se estiver logado e tiver as permissões, renderiza o conteúdo da página
    return children;
};

export default ProtectedRoute;