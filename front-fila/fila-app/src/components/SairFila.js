import React, { useState } from 'react';
import axios from 'axios';

const SairFila = ({ socket }) => {
  const [senha, setSenha] = useState('');
  const [funcionarioId, setFuncionarioId] = useState(''); // Adicionei este campo
  const [mensagem, setMensagem] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3333/clientes/sair', { senha, funcionarioId }); // Inclua funcionarioId
      setMensagem('Você saiu da fila com sucesso.');
      setError('');
      socket.emit('clienteSaiu', { senha });
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao sair da fila');
      setMensagem('');
    }
  };

  return (
    <div>
      <h1>Sair da Fila</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID do Funcionário"
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
        />
        <button type="submit">Sair da Fila</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SairFila;
