import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // <-- ESSENCIAL para o Logout

function LojaPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout(navigate); // Chama o logout, passando o navigate
    };

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
                <h1>Loja Online (Vitrine de Produtos) 🛍️</h1>
                <button onClick={handleLogout} className="botao-principal" style={{ backgroundColor: '#dc3545', width: 'auto' }}>Sair / Logout</button>
            </header>
            
            <p>Seja bem-vindo(a)! Abaixo estão os produtos fictícios solicitados para o projeto da faculdade.</p>
            <h3 style={{ marginTop: '30px' }}>Produtos em Destaque</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                
                {/* Produto 1: Notebook */}
                <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>Notebook Ultra Slim X9</h4>
                    <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.2em' }}>R$ 4.800,00</p>
                    <p style={{ margin: '5px 0' }}>Avaliação: <span style={{ color: 'gold' }}>⭐⭐⭐⭐⭐</span> (5.0)</p>
                    <p style={{ fontSize: '0.9em', color: '#555' }}>Processador i7, 16GB RAM.</p>
                    <button className="botao-adicionar" style={{ width: '100%', padding: '10px' }}>Adicionar ao Carrinho</button>
                </div>
                
                {/* Produto 2: Teclado */}
                <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>Teclado Mecânico RGB Pro</h4>
                    <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.2em' }}>R$ 650,00</p>
                    <p style={{ margin: '5px 0' }}>Avaliação: <span style={{ color: 'gold' }}>⭐⭐⭐⭐</span> (4.2)</p>
                    <p style={{ fontSize: '0.9em', color: '#555' }}>Switches Blue, Layout ABNT2.</p>
                    <button className="botao-adicionar" style={{ width: '100%', padding: '10px', backgroundColor: '#0056b3' }}>Adicionar ao Carrinho</button>
                </div>

                {/* Produto 3: Mouse */}
                <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>Mouse Sem Fio Vertical</h4>
                    <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.2em' }}>R$ 189,90</p>
                    <p style={{ margin: '5px 0' }}>Avaliação: <span style={{ color: 'gold' }}>⭐⭐⭐</span> (3.5)</p>
                    <p style={{ fontSize: '0.9em', color: '#555' }}>Design ergonômico.</p>
                    <button className="botao-adicionar" style={{ width: '100%', padding: '10px' }}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    );
}
export default LojaPage;