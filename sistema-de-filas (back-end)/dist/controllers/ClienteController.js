"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarCliente = void 0;
const data_source_1 = require("../data-source");
const Cliente_1 = __importDefault(require("../entities/Cliente"));
const Fila_1 = __importDefault(require("../entities/Fila"));
const Atendimento_1 = __importDefault(require("../entities/Atendimento"));
const Saida_1 = __importDefault(require("../entities/Saida"));
const Funcionario_1 = __importDefault(require("../entities/Funcionario"));
const cadastrarCliente = async (name, lugares) => {
    const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.default);
    const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
    const senha = Math.floor(1000 + Math.random() * 9000).toString(); // Gerar senha de 4 dígitos
    const cliente = clienteRepository.create({ name, lugares, senha });
    await clienteRepository.save(cliente);
    console.log(`Buscando filas com capacidade >= ${lugares}`);
    const filas = await filaRepository.createQueryBuilder("fila")
        .leftJoinAndSelect("fila.clientes", "cliente")
        .where("fila.capacidade >= :lugares", { lugares })
        .orderBy("fila.capacidade", "ASC")
        .getMany();
    console.log('Filas encontradas:', filas);
    const fila = filas[0];
    if (!fila) {
        throw new Error('Nenhuma fila disponível para essa quantidade de lugares');
    }
    fila.clientes.push(cliente);
    await filaRepository.save(fila);
    return { cliente, fila };
};
exports.cadastrarCliente = cadastrarCliente;
class ClienteController {
    async store(req, res) {
        try {
            const { name, lugares } = req.body;
            if (lugares < 1 || lugares > 10) {
                return res.status(400).json({ error: 'Capacidade da fila deve estar entre 1 e 10 lugares.' });
            }
            const { cliente, fila } = await (0, exports.cadastrarCliente)(name, lugares);
            // Emitir evento de atualização da fila
            const io = req.app.get('io');
            io.emit('filaAtualizada', fila);
            return res.json({ message: 'Cliente adicionado com sucesso', senha: cliente.senha, fila });
        }
        catch (error) {
            console.error('Erro ao adicionar cliente:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async status(req, res) {
        try {
            console.log('Requisição recebida para verificar status');
            const { senha } = req.query;
            console.log(`Buscando cliente com a senha: ${senha}`);
            const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.default);
            const cliente = await clienteRepository.findOne({
                where: { senha },
                relations: ['fila', 'fila.clientes']
            });
            if (!cliente) {
                console.error('Cliente não encontrado');
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            const fila = cliente.fila;
            // Ordenar clientes manualmente
            fila.clientes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            const posicao = fila.clientes.findIndex((c) => c.senha === senha) + 1;
            console.log(`Posição encontrada: ${posicao}, Fila: ${fila.capacidade}`);
            return res.json({ posicao, fila: fila.capacidade });
        }
        catch (error) {
            console.error('Erro ao verificar status do cliente:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async sair(req, res) {
        try {
            const { senha, funcionarioId } = req.body;
            const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.default);
            const saidaRepository = data_source_1.AppDataSource.getRepository(Saida_1.default);
            const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
            const funcionarioRepository = data_source_1.AppDataSource.getRepository(Funcionario_1.default);
            const cliente = await clienteRepository.findOne({ where: { senha }, relations: ['fila'] });
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
            // Emitir evento de atualização da fila
            const io = req.app.get('io');
            io.emit('filaAtualizada', fila);
            return res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao remover cliente da fila:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async redirecionarParaAtendimento(req, res) {
        try {
            const { senha, funcionarioId } = req.body;
            const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.default);
            const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
            const atendimentoRepository = data_source_1.AppDataSource.getRepository(Atendimento_1.default);
            const funcionarioRepository = data_source_1.AppDataSource.getRepository(Funcionario_1.default);
            const cliente = await clienteRepository.findOne({ where: { senha }, relations: ['fila'] });
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
            const atendimento = atendimentoRepository.create({ cliente, fila, funcionario });
            await atendimentoRepository.save(atendimento);
            // Emitir evento de atualização da fila
            const io = req.app.get('io');
            io.emit('filaAtualizada', fila);
            return res.status(200).json({ message: 'Cliente redirecionado para atendimento' });
        }
        catch (error) {
            console.error('Erro ao redirecionar cliente para atendimento:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.default = new ClienteController();
