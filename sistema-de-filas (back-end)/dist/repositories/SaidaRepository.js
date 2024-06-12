"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaidaRepository = void 0;
const Saida_1 = __importDefault(require("../entities/Saida"));
const SaidaRepository = (dataSource) => dataSource.getRepository(Saida_1.default);
exports.SaidaRepository = SaidaRepository;
