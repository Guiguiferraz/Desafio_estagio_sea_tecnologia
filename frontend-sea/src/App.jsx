import React, { useState } from 'react';
import axios from 'axios';
import { IMaskInput } from 'react-imask'; // <-- CORREÇÃO: Usamos o IMaskInput
import './App.css'; 
import { Link } from 'react-router-dom';

function App() {
  
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    senha: '', 
    confirmarSenha: '', 
    role: 'USER', 
    endereco: {
      cep: '',
      numero: '',
      complemento: ''
    },
    telefones: [],
    emails: []
  });
  // ... (Resto do código igual)

  const [telefoneAtual, setTelefoneAtual] = useState({
    tipo: 'CELULAR',
    numero: ''
  });
  const [emailAtual, setEmailAtual] = useState('');


  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cpf' || name === 'endereco.cep' || name === 'telefoneNumero') {
      value = value.replaceAll(/[^\d]/g, ''); 
    }

    if (name.startsWith('endereco.')) {
      const [parentKey, childKey] = name.split('.'); 
      setFormData(prevState => ({
        ...prevState,
        [parentKey]: { ...prevState[parentKey], [childKey]: value }
      }));
    } else if (name === 'telefoneTipo' || name === 'telefoneNumero') {
      setTelefoneAtual(prevState => ({
        ...prevState,
        [name === 'telefoneTipo' ? 'tipo' : 'numero']: value
      }));
    } else if (name === 'email') {
      setEmailAtual(value);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const adicionarTelefone = () => {
    if (telefoneAtual.numero.trim() === '') {
      alert('Por favor, preencha o número do telefone.');
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      telefones: [...prevState.telefones, telefoneAtual]
    }));
    setTelefoneAtual({ tipo: 'CELULAR', numero: '' });
  };
  const removerTelefone = (indexParaRemover) => {
    setFormData(prevState => ({
      ...prevState,
      telefones: prevState.telefones.filter((_, index) => index !== indexParaRemover)
    }));
  };
  const adicionarEmail = () => {
    if (emailAtual.trim() === '' || !emailAtual.includes('@')) {
      alert('Por favor, digite um e-mail válido.');
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      emails: [...prevState.emails, { email: emailAtual }]
    }));
    setEmailAtual('');
  };
  const removerEmail = (indexParaRemover) => {
    setFormData(prevState => ({
      ...prevState,
      emails: prevState.emails.filter((_, index) => index !== indexParaRemover)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (formData.senha !== formData.confirmarSenha) {
        alert('ERRO: As senhas não conferem!');
        return;
    }
    if (formData.senha.length < 6) {
        alert('ERRO: A senha deve ter no mínimo 6 caracteres.');
        return;
    }
    if (formData.telefones.length === 0) {
      alert('ERRO: Você deve cadastrar pelo menos um telefone.');
      return;
    }
    if (formData.emails.length === 0) {
      alert('ERRO: Você deve cadastrar pelo menos um e-mail.');
      return;
    }

    const dataToSend = {
        ...formData,
        confirmarSenha: undefined 
    }
    
    console.log("Enviando para o back-end:", dataToSend);

    try {
      const url = 'http://localhost:8080/api/clientes';
      const response = await axios.post(url, dataToSend); 
      
      console.log("Resposta do back-end:", response.data);
      alert('Conta criada com sucesso! Você pode fazer login agora.');
      
      window.location.href = '/'; 

    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      const mensagemErro = error.response?.data?.message || "Verifique o console (F12).";
      alert(`ERRO: Não foi possível criar a conta. Motivo: ${mensagemErro}`);
    }
  };


  return (
    <div className="container">
      <h1>Criar Conta (Cadastro de Cliente)</h1>
      
      <form onSubmit={handleSubmit}>
        
        <fieldset>
          <legend>Dados de Acesso e Pessoais</legend>
          
          <div>
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome"
              value={formData.nome}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <IMaskInput 
              mask="000.000.000-00" 
              type="text" 
              id="cpf" 
              name="cpf"
              value={formData.cpf}
              onAccept={(value) => handleChange({target: {name: 'cpf', value: value}})}
            />
          </div>

          <div>
            <label htmlFor="senha">Senha (Mín. 6 caracteres):</label>
            <input 
              type="password"
              id="senha" 
              name="senha"
              value={formData.senha}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input 
              type="password" 
              id="confirmarSenha" 
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange} 
            />
          </div>
        </fieldset>

        {/* --- ENDEREÇO --- */}
        <fieldset>
          <legend>Endereço</legend>
          <div>
            <label htmlFor="cep">CEP:</label>
            <IMaskInput 
              mask="00000-000"
              type="text" 
              id="cep" 
              name="endereco.cep"
              value={formData.endereco.cep}
              onAccept={(value) => handleChange({target: {name: 'endereco.cep', value: value}})}
            />
          </div>
          <div>
            <label htmlFor="numero">Número:</label>
            <input 
              type="text" 
              id="numero" 
              name="endereco.numero"
              value={formData.endereco.numero}
              onChange={handleChange} 
            />
          </div>
           <div>
            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text" 
              id="complemento" 
              name="endereco.complemento"
              value={formData.endereco.complemento}
              onChange={handleChange} 
            />
          </div>
        </fieldset>

        {/* --- TELEFONES --- */}
        <fieldset>
          <legend>Telefones</legend>
          
          <div className="campo-telefone">
            <div>
              <label htmlFor="telefoneTipo">Tipo:</label>
              <select 
                id="telefoneTipo" 
                name="telefoneTipo" 
                value={telefoneAtual.tipo}
                onChange={handleChange}
              >
                <option value="CELULAR">Celular</option>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </select>
            </div>
            <div className="numero-telefone">
              <label htmlFor="telefoneNumero">Número:</label>
              <IMaskInput 
                mask={telefoneAtual.tipo === 'CELULAR' ? '(00) 00000-0000' : '(00) 0000-0000'}
                type="text" 
                id="telefoneNumero"
                name="telefoneNumero"
                value={telefoneAtual.numero}
                onAccept={(value) => handleChange({target: {name: 'telefoneNumero', value: value}})}
              />
            </div>
            
            <button 
              type="button" 
              onClick={adicionarTelefone} 
              className="botao-adicionar"
            >
              Adicionar
            </button>
          </div>

          <div className="lista-itens">
            {formData.telefones.map((tel, index) => (
              <div key={index} className="item-adicionado">
                <span>{tel.tipo}: {tel.numero}</span>
                <button 
                  type="button" 
                  onClick={() => removerTelefone(index)} 
                  className="botao-remover"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </fieldset>
        
        {/* --- E-MAILS --- */}
        <fieldset>
          <legend>E-mails</legend>
          
          <div className="campo-email">
            <div className="endereco-email">
              <label htmlFor="email">E-mail:</label>
              <input
                type="text" 
                id="email"
                name="email"
                value={emailAtual}
                onChange={handleChange}
                placeholder="exemplo@email.com"
              />
            </div>
            
            <button 
              type="button" 
              onClick={adicionarEmail} 
              className="botao-adicionar"
            >
              Adicionar
            </button>
          </div>

          <div className="lista-itens">
            {formData.emails.map((emailObj, index) => (
              <div key={index} className="item-adicionado">
                <span>{emailObj.email}</span> 
                <button 
                  type="button" 
                  onClick={() => removerEmail(index)} 
                  className="botao-remover"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="botao-principal">Criar Minha Conta</button>
        
        {/* LINK DE VOLTA PARA O LOGIN */}
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
                Voltar para o Login
            </Link>
        </div>
      </form>
    </div>
  );
}

export default App; 