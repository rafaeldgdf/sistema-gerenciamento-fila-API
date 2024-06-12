import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3333'); // Conectar ao backend

const FuncionarioView = () => {
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    const fetchFilas = async () => {
      const response = await axios.get('http://localhost:3333/funcionarios/filas');
      const sortedFilas = response.data.sort((a, b) => a.capacidade - b.capacidade);
      setFilas(sortedFilas);
    };

    fetchFilas();
    socket.on('filaAtualizada', (filaAtualizada) => {
      setFilas((prevFilas) =>
        prevFilas
          .map((fila) => (fila.id === filaAtualizada.id ? filaAtualizada : fila))
          .sort((a, b) => a.capacidade - b.capacidade)
      );
    });

    return () => socket.off('filaAtualizada');
  }, []);

  const handleChamarCliente = async (filaId) => {
    await axios.post('http://localhost:3333/funcionarios/chamar', { filaId });
  };

  return (
    <div>
      <h1>Filas</h1>
      {filas.map((fila) => (
        <div key={fila.id}>
          <h2>Fila de {fila.capacidade} Lugares</h2>
          {fila.clientes.length === 0 ? (
            <p>Nenhum cliente na fila</p>
          ) : (
            <ul>
              {fila.clientes.map((cliente, index) => (
                <li key={cliente.id}>
                  {index + 1}º {cliente.name} - Senha: {cliente.senha}
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => handleChamarCliente(fila.id)}>Chamar Cliente</button>
        </div>
      ))}
    </div>
  );
};

export default FuncionarioView;
