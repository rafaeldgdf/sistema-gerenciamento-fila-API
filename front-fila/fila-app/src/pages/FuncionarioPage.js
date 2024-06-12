import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import ChamarCliente from '../components/ChamarCliente';
import RemoverCliente from '../components/RemoverCliente';
import VerFila from '../components/VerFila';

const FuncionarioPage = ({ socket }) => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Typography variant="h5" sx={{ mx: 2 }}>
          <Link to="/funcionario/chamar-cliente">Chamar Cliente</Link>
        </Typography>
        <Typography variant="h5" sx={{ mx: 2 }}>
          <Link to="/funcionario/remover-cliente">Remover Cliente</Link>
        </Typography>
        <Typography variant="h5" sx={{ mx: 2 }}>
          <Link to="/funcionario/ver-fila">Ver Fila</Link>
        </Typography>
      </Box>
      <Routes>
        <Route path="chamar-cliente" element={<ChamarCliente socket={socket} />} />
        <Route path="remover-cliente" element={<RemoverCliente socket={socket} />} />
        <Route path="ver-fila" element={<VerFila />} />
      </Routes>
    </Container>
  );
};

export default FuncionarioPage;
