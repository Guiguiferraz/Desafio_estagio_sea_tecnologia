import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; <--- Linha REMOVIDA

const AuthContext = createContext(null);

// Hook para ser usado em qualquer componente (ex: const { user } = useAuth();)
export const useAuth = () => useContext(AuthContext);

// Provedor (É o componente que envolve a aplicação e fornece os dados)
export const AuthProvider = ({ children }) => {
    
    // O estado vai guardar o role do usuário (ADMIN/USER)
    const [user, setUser] = useState(null);

    // 2. Verifica o localStorage quando a aplicação inicia (se o crachá está lá)
    useEffect(() => {
        const storedRole = localStorage.getItem('user_role');
        if (storedRole) {
            setUser(storedRole);
        }
    }, []);

    // 3. Função de Login (AGORA RECEBE A FUNÇÃO DE REDIRECIONAR DE FORA)
    const login = (role, navigate) => { 
        localStorage.setItem('user_role', role); // Salva o role
        setUser(role); // Atualiza o estado
        
        // Redireciona o usuário (sem usar o hook aqui)
        if (role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/loja');
        }
    };

    // 4. Função de Logout (AGORA RECEBE A FUNÇÃO DE REDIRECIONAR DE FORA)
    const logout = (navigate) => {
        localStorage.removeItem('user_role'); // Apaga o crachá
        setUser(null); // Limpa o estado
        navigate('/'); // Volta para a tela de Login
    };

    // 5. Retorna o Provedor com os dados/funções
    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>
    );
};