import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const { logout } = useAuth();
    const navigate = useNavigate(); 
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lógica do Logout (Essencial para o botão 'Sair' funcionar)
    const handleLogout = () => {
        logout(navigate); 
    };

    // Lógica para buscar os dados no Back-end (GET /api/clientes)
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                // Chama o endpoint GET que testamos e que funciona no navegador
                const response = await axios.get('http://localhost:8080/api/clientes');
                setClientes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Não foi possível carregar a lista de clientes. Verifique se o Back-end está rodando.');
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    if (loading) return <div className="container" style={{marginTop: '50px'}}><h2>Carregando Clientes...</h2></div>;
    if (error) return <div className="container" style={{color: 'red', marginTop: '50px'}}><h3>{error}</h3></div>;

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
                <h1>Área Administrativa (Clientes Cadastrados) 🧑‍💻</h1>
                <button onClick={handleLogout} className="botao-principal" style={{ backgroundColor: '#dc3545', width: 'auto' }}>Sair / Logout</button> 
            </header>
            
            <p style={{ fontWeight: 'bold' }}>Total de Clientes no Banco: **{clientes.length}**</p>
            <hr />
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '0.9em' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Nome</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>CPF</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Role</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Endereço (CEP)</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Telefones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{cliente.nome}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{cliente.cpf}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold', color: cliente.role === 'ADMIN' ? 'darkred' : 'darkgreen' }}>{cliente.role}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{cliente.endereco?.cep}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', fontSize: '0.8em' }}>
                                {cliente.telefones.map(t => `${t.tipo}: ${t.numero}`).join(' | ')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {clientes.length === 0 && <p style={{ marginTop: '20px', color: '#555' }}>Nenhum cliente cadastrado.</p>}
        </div>
    );
}
export default AdminPage;