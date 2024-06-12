"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilaRepository = void 0;
const Fila_1 = __importDefault(require("../entities/Fila"));
const FilaRepository = (dataSource) => dataSource.getRepository(Fila_1.default);
exports.FilaRepository = FilaRepository;
