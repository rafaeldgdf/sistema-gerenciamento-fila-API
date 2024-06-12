"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClienteController_1 = __importDefault(require("./controllers/ClienteController"));
const FuncionarioController_1 = __importDefault(require("./controllers/FuncionarioController"));
const FilaController_1 = __importDefault(require("./controllers/FilaController"));
const routes = (0, express_1.Router)();
// Rotas para clientes
routes.post('/clientes', ClienteController_1.default.store);
routes.get('/clientes/status', ClienteController_1.default.status);
routes.post('/clientes/sair', ClienteController_1.default.sair);
routes.post('/clientes/atendimento', ClienteController_1.default.redirecionarParaAtendimento);
// Rotas para funcionários
routes.get('/funcionarios/filas', FuncionarioController_1.default.visualizarFilas);
routes.post('/funcionarios/chamar', FuncionarioController_1.default.chamarCliente);
routes.delete('/funcionarios/remover', FuncionarioController_1.default.removerCliente);
// Rota para fila
routes.get('/filas', FilaController_1.default.list);
exports.default = routes;
