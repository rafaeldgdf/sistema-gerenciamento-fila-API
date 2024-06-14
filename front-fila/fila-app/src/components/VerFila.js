import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Paper } from '@mui/material';
import io from 'socket.io-client';
import '../App.css'; // Corrija o caminho para importar o App.css

const socket = io('http://localhost:3333');

const VerFila = () => {
  const [filas, setFilas] = useState([]);

  const sortClientes = (fila) => {
    fila.clientes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return fila;
  };

  useEffect(() => {
    const fetchFilas = async () => {
      try {
        const response = await axios.get('http://localhost:3333/filas');
        const sortedFilas = response.data.map(sortClientes).sort((a, b) => a.capacidade - b.capacidade);
        setFilas(sortedFilas);
      } catch (error) {
        console.error('Erro ao carregar as filas:', error);
      }
    };

    fetchFilas();

    socket.on('filaAtualizada', (atualizacaoFila) => {
      setFilas((prevFilas) =>
        prevFilas
          .map((fila) =>
            fila.id === atualizacaoFila.id ? sortClientes(atualizacaoFila) : fila
          )
          .sort((a, b) => a.capacidade - b.capacidade)
      );
    });

    return () => {
      socket.off('filaAtualizada');
    };
  }, []);

  return (
    <div className="FilasGrid">
      {filas.length > 0 ? (
        filas.map((fila) => (
          <Card className="FilaCard" key={fila.id}>
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontFamily: 'Impact', fontSize: '1.5rem', textTransform: 'uppercase' }}
              >
                Fila de {fila.capacidade} Lugares
              </Typography>
              <Paper sx={{ backgroundColor: '#000', padding: 1, borderRadius: 1 }}>
                {fila.clientes.length > 0 ? (
                  fila.clientes.map((cliente, index) => (
                    <Typography
                      key={cliente.id}
                      style={{ color: '#000', fontWeight: index === 0 ? 'bold' : 'normal' }}
                    >
                      {index + 1}. {cliente.name} (Senha: {cliente.senha})
                    </Typography>
                  ))
                ) : (
                  <Typography style={{ color: '#000' }}>Nenhum cliente na fila</Typography>
                )}
              </Paper>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>Carregando filas...</Typography>
      )}
    </div>
  );
};

export default VerFila;
