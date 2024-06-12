"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioRepository = void 0;
const Funcionario_1 = __importDefault(require("../entities/Funcionario"));
const FuncionarioRepository = (dataSource) => dataSource.getRepository(Funcionario_1.default);
exports.FuncionarioRepository = FuncionarioRepository;
