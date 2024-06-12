"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const ClienteRepository_1 = require("../repositories/ClienteRepository");
const FilaRepository_1 = require("../repositories/FilaRepository");
const SaidaRepository_1 = require("../repositories/SaidaRepository");
const Atendimento_1 = __importDefault(require("../entities/Atendimento"));
class ClienteService {
    constructor() {
        this.clienteRepository = (0, ClienteRepository_1.ClienteRepository)(data_source_1.AppDataSource);
        this.filaRepository = (0, FilaRepository_1.FilaRepository)(data_source_1.AppDataSource);
        this.saidaRepository = (0, SaidaRepository_1.SaidaRepository)(data_source_1.AppDataSource);
    }
    async criarCliente(name, lugares) {
        const senha = Math.floor(1000 + Math.random() * 9000).toString();
        const cliente = this.clienteRepository.create({ name, lugares, senha });
        await this.clienteRepository.save(cliente);
        const fila = await this.filaRepository.findOne({ where: { capacidade: lugares }, relations: ['clientes'] });
        if (!fila) {
            throw new Error('Nenhuma fila disponível para essa quantidade de lugares');
        }
        fila.clientes.push(cliente);
        await this.filaRepository.save(fila);
        return cliente;
    }
    async obterStatusCliente(senha) {
        const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        const fila = cliente.fila;
        const posicao = fila.clientes.findIndex((c) => c.senha === senha) + 1;
        return { posicao };
    }
    async removerCliente(senha) {
        const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        const fila = cliente.fila;
        fila.clientes = fila.clientes.filter((c) => c.senha !== cliente.senha);
        await this.clienteRepository.remove(cliente);
        await this.filaRepository.save(fila);
        const saida = this.saidaRepository.create({
            cliente: cliente, // Associa o cliente à saída
        });
        await this.saidaRepository.save(saida);
    }
    async redirecionarParaAtendimento(senha, funcionarioId) {
        const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        const fila = cliente.fila;
        fila.clientes = fila.clientes.filter((c) => c.senha !== cliente.senha);
        await this.clienteRepository.remove(cliente);
        await this.filaRepository.save(fila);
        const atendimentoRepository = data_source_1.AppDataSource.getRepository(Atendimento_1.default);
        const atendimento = atendimentoRepository.create({ cliente, fila, funcionario: { id: funcionarioId } });
        await atendimentoRepository.save(atendimento);
    }
}
exports.default = new ClienteService();
