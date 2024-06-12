"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Fila_1 = __importDefault(require("../entities/Fila"));
class FilaController {
    async list(req, res) {
        try {
            const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
            const filas = await filaRepository.find({
                relations: ['clientes'],
            });
            // Ordenar clientes manualmente
            filas.forEach(fila => {
                fila.clientes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            });
            return res.json(filas);
        }
        catch (error) {
            console.error('Erro ao listar filas:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.default = new FilaController();
