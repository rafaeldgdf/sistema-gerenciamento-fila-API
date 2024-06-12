import React, { useState } from 'react';
import axios from 'axios';

const ChamarCliente = () => {
  const [filaId, setFilaId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChamarCliente = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3333/funcionarios/chamar', { filaId });
      setMensagem('Cliente chamado com sucesso.');
    } catch (error) {
      setMensagem(error.response?.data?.error || 'Erro ao chamar cliente');
    }
  };

  return (
    <div>
      <h1>Chamar Cliente</h1>
      <form onSubmit={handleChamarCliente}>
        <input
          type="text"
          placeholder="ID da Fila"
          value={filaId}
          onChange={(e) => setFilaId(e.target.value)}
        />
        <button type="submit">Chamar Cliente</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default ChamarCliente;
