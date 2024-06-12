import { Router } from 'express';
import ClienteController from './controllers/ClienteController';
import FuncionarioController from './controllers/FuncionarioController';
import FilaController from './controllers/FilaController';

const routes = Router();

// Rotas para clientes
routes.post('/clientes', ClienteController.store);
routes.get('/clientes/status', ClienteController.status);
routes.post('/clientes/sair', ClienteController.sair);
routes.post('/clientes/atendimento', ClienteController.redirecionarParaAtendimento);

// Rotas para funcionários
routes.get('/funcionarios/filas', FuncionarioController.visualizarFilas);
routes.post('/funcionarios/chamar', FuncionarioController.chamarCliente);
routes.delete('/funcionarios/remover', FuncionarioController.removerCliente);

// Rota para fila
routes.get('/filas', FilaController.list);

export default routes;
