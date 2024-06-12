"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Cliente_1 = __importDefault(require("../entities/Cliente"));
const Fila_1 = __importDefault(require("../entities/Fila"));
const Atendimento_1 = __importDefault(require("../entities/Atendimento"));
const Saida_1 = __importDefault(require("../entities/Saida"));
const Funcionario_1 = __importDefault(require("../entities/Funcionario"));
class FuncionarioController {
    async visualizarFilas(req, res) {
        const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
        const filas = await filaRepository.find({ relations: ['clientes'] });
        return res.json(filas);
    }
    async chamarCliente(req, res) {
        const { filaId } = req.body;
        const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
        const atendimentoRepository = data_source_1.AppDataSource.getRepository(Atendimento_1.default);
        const fila = await filaRepository.findOne({ where: { id: filaId }, relations: ['clientes'] });
        if (!fila) {
            return res.status(404).json({ error: 'Fila não encontrada' });
        }
        const cliente = fila.clientes.shift();
        if (!cliente) {
            return res.status(404).json({ error: 'Nenhum cliente na fila' });
        }
        await filaRepository.save(fila);
        const atendimento = atendimentoRepository.create({ cliente, fila });
        await atendimentoRepository.save(atendimento);
        return res.json(cliente);
    }
    async removerCliente(req, res) {
        const { clienteId, funcionarioId } = req.body;
        const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.default);
        const saidaRepository = data_source_1.AppDataSource.getRepository(Saida_1.default);
        const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
        const funcionarioRepository = data_source_1.AppDataSource.getRepository(Funcionario_1.default);
        const cliente = await clienteRepository.findOne({ where: { id: clienteId }, relations: ['fila'] });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const fila = cliente.fila;
        fila.clientes = fila.clientes.filter((c) => c.id !== cliente.id);
        await clienteRepository.remove(cliente);
        await filaRepository.save(fila);
        const funcionario = await funcionarioRepository.findOne({ where: { id: funcionarioId } });
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        const saida = saidaRepository.create({ cliente, funcionario });
        await saidaRepository.save(saida);
        return res.status(204).send();
    }
}
exports.default = new FuncionarioController();
