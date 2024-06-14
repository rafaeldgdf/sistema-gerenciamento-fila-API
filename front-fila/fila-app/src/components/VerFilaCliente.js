import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:3333');

const VerFila = () => {
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    const fetchFilas = async () => {
      try {
        const response = await axios.get('http://localhost:3333/funcionarios/filas');
        const sortedFilas = response.data.sort((a, b) => a.capacidade - b.capacidade);
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
            fila.id === atualizacaoFila.id ? atualizacaoFila : fila
          )
          .sort((a, b) => a.capacidade - b.capacidade)
      );
    });

    return () => {
      socket.off('filaAtualizada');
    };
  }, []);

  return (
    <Box sx={{ padding: '16px', backgroundColor: 'rgb(63, 37, 13)'}}>
      <Typography variant="h4" align="center" gutterBottom>Filas</Typography>
      <Grid container spacing={2}>
        {filas.length > 0 ? (
          filas.map((fila) => (
            <Grid item xs={12} sm={6} md={4} key={fila.id}>
              <Paper sx={{ padding: '16px', height: '100%' }}>
                <Typography variant="h6" align="center">Fila de {fila.capacidade} Lugares</Typography>
                <List>
                  {fila.clientes.map((cliente, index) => (
                    <ListItem key={cliente.id}>
                      <ListItemText primary={`${index + 1}. ${cliente.name} (Senha: ${cliente.senha})`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>Carregando filas...</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default VerFila;
