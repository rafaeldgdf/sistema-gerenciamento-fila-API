"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const FilaRepository_1 = require("../repositories/FilaRepository");
const AtendimentoRepository_1 = require("../repositories/AtendimentoRepository");
const SaidaRepository_1 = require("../repositories/SaidaRepository");
const ClienteRepository_1 = require("../repositories/ClienteRepository");
class FuncionarioController {
    async visualizarFilas(req, res) {
        const filaRepository = (0, FilaRepository_1.FilaRepository)(data_source_1.AppDataSource);
        const filas = await filaRepository.find({ relations: ['clientes'] });
        return res.json(filas);
    }
    async chamarCliente(req, res) {
        const { filaId } = req.body;
        const filaRepository = (0, FilaRepository_1.FilaRepository)(data_source_1.AppDataSource);
        const atendimentoRepository = (0, AtendimentoRepository_1.AtendimentoRepository)(data_source_1.AppDataSource);
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
        const { clienteId } = req.body;
        const clienteRepository = (0, ClienteRepository_1.ClienteRepository)(data_source_1.AppDataSource);
        const saidaRepository = (0, SaidaRepository_1.SaidaRepository)(data_source_1.AppDataSource);
        const cliente = await clienteRepository.findOne({ where: { id: clienteId }, relations: ['fila'] });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const fila = cliente.fila;
        fila.clientes = fila.clientes.filter(c => c.id !== cliente.id);
        await clienteRepository.remove(cliente);
        await (0, FilaRepository_1.FilaRepository)(data_source_1.AppDataSource).save(fila);
        const saida = saidaRepository.create({ ...cliente });
        await saidaRepository.save(saida);
        return res.status(204).send();
    }
}
exports.default = new FuncionarioController();
