import React, { useState } from 'react';
import axios from 'axios';

const StatusCliente = () => {
  const [senha, setSenha] = useState('');
  const [posicao, setPosicao] = useState(null);
  const [fila, setFila] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3333/clientes/status?senha=${senha}`);
      setPosicao(response.data.posicao);
      setFila(response.data.fila);
      setError('');
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setError(error.response?.data?.error || 'Erro ao verificar status');
      setPosicao(null);
      setFila(null);
    }
  };

  return (
    <div>
      <h1 className="tituloInputs">Status Cliente</h1>
      <form onSubmit={handleSubmit} className='inputs'>
        <input
          id='inputSenha'
          type="text"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit" id="verStatus">Verificar Status</button>
      </form>
      {posicao !== null && fila !== null && (
        <p>Você está na <strong>{posicao}ª</strong> posição na <strong>Fila de {fila} lugares</strong>.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default StatusCliente;
