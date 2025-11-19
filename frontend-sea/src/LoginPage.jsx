import React, { useState } from 'react';
import axios from 'axios';
import { IMaskInput } from 'react-imask';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import './App.css'; 

function LoginPage() {
    
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    
    // 1. Chamamos o hook de navegação (no lugar certo)
    const navigate = useNavigate(); 
    
    // 2. Chamamos o hook de autenticação para pegar a função de login
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpa a máscara do CPF (já estava correto)
        const cpfLimpo = cpf.replaceAll(/[^\d]/g, ''); 
        
        // Limpa a senha enviada (o que resolveu o erro de espaço invisível)
        const senhaLimpa = senha.trim(); 

        const url = 'http://localhost:8080/api/auth/login';

        try {
            const response = await axios.post(url, {
                cpf: cpfLimpo,
                senha: senhaLimpa 
            });

            const role = response.data.role;
            console.log("Login com sucesso! Crachá:", role);

            // 3. Chamamos a função de login que está no AuthContext, 
            //    passando o role e a função 'navigate' (e o redirecionamento acontece)
            login(role, navigate);

            // A linha do alert foi removida para não travar o redirecionamento! 

        } catch (error) {
            // Se o Back-end retornar erro 401
            console.error("Erro no login:", error);
            alert('Falha no login. CPF ou senha inválidos.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '550px' }}>
            <h1>Login</h1>
            
            <form onSubmit={handleSubmit}>
                
                <fieldset>
                    <legend>Acesse sua conta</legend>
                    <div>
                        <label htmlFor="cpf">CPF:</label>
                        <IMaskInput 
                            mask="000.000.000-00"
                            type="text" 
                            id="cpf" 
                            name="cpf"
                            value={cpf}
                            onAccept={(value) => setCpf(value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <input 
                            type="password" 
                            id="senha" 
                            name="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                </fieldset>

                <button type="submit" className="botao-principal">Entrar</button>

                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <p>
                        Não possui conta? {' '}
                        <Link to="/cadastro" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                            Cadastre-se aqui
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;