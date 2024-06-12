import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3333'); // Conectar ao backend

const FilaView = () => {
  const [filas, setFilas] = useState([]);

  const sortClientes = (filas) => {
    return filas.map(fila => ({
      ...fila,
      clientes: fila.clientes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }));
  };

  useEffect(() => {
    const fetchFilas = async () => {
      const response = await axios.get('http://localhost:3333/filas');
      const sortedFilas = sortClientes(response.data);
      setFilas(sortedFilas);
    };

    fetchFilas();

    socket.on('filaAtualizada', (filaAtualizada) => {
      setFilas((prevFilas) => {
        const updatedFilas = prevFilas.map((fila) => (fila.id === filaAtualizada.id ? filaAtualizada : fila));
        return sortClientes(updatedFilas);
      });
    });

    return () => socket.off('filaAtualizada');
  }, []);

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
        </div>
      ))}
    </div>
  );
};

export default FilaView;
