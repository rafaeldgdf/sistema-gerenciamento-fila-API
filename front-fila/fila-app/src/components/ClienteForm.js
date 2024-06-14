import React, { useState } from 'react';
import axios from 'axios';

const ClienteForm = ({ socket }) => {
  const [name, setName] = useState('');
  const [lugares, setLugares] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/clientes', { name, lugares });
      setMessage(`Cliente adicionado com sucesso: ${response.data.senha}`);
      setError('');
      socket.emit('filaAtualizada', response.data.fila);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      setError(error.response?.data?.error || 'Erro ao adicionar cliente');
      setMessage('');
    }
  };

  return (
    <div>
      <h1 className='tituloInputs'>Cadastrar Cliente</h1>
      <form onSubmit={handleSubmit} className='inputs'>
        <input
          className='inputCadastro'
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Lugares"
          value={lugares}
          min="0"
          onChange={(e) => setLugares(e.target.value)}
          className='inputCadastro'
        />
        <button type="submit" id='entrarFila'>Entrar na Fila</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ClienteForm;
