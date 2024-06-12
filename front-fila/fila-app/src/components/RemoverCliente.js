import React, { useState } from 'react';
import axios from 'axios';

const RemoverCliente = () => {
  const [clienteId, setClienteId] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRemoverCliente = async (event) => {
    event.preventDefault();
    try {
      await axios.delete('http://localhost:3333/funcionarios/remover', {
        data: { clienteId, funcionarioId }
      });
      setMensagem('Cliente removido com sucesso.');
    } catch (error) {
      setMensagem(error.response?.data?.error || 'Erro ao remover cliente');
    }
  };

  return (
    <div>
      <h1>Remover Cliente</h1>
      <form onSubmit={handleRemoverCliente}>
        <input
          type="text"
          placeholder="ID do Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID do Funcionário"
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
        />
        <button type="submit">Remover Cliente</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default RemoverCliente;
