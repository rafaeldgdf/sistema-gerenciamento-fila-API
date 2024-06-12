// src/components/ClientePage.js

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClienteForm from './ClienteForm';
import StatusCliente from './StatusCliente';
import SairFila from './SairFila';
import VerFila from './VerFila';

const ClientePage = ({ socket }) => {
  return (
    <div>
      <nav>
        <Link to="/cliente/cadastrar">Cadastrar Cliente</Link>
        <Link to="/cliente/status">Status Cliente</Link>
        <Link to="/cliente/sair">Sair da Fila</Link>
        <Link to="/cliente/ver">Ver Fila</Link>
      </nav>
      <Routes>
        <Route path="cadastrar" element={<ClienteForm socket={socket} />} />
        <Route path="status" element={<StatusCliente />} />
        <Route path="sair" element={<SairFila />} />
        <Route path="ver" element={<VerFila />} />
      </Routes>
    </div>
  );
};

export default ClientePage;
