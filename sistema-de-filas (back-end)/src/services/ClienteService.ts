import { AppDataSource } from '../data-source';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { FilaRepository } from '../repositories/FilaRepository';
import { SaidaRepository } from '../repositories/SaidaRepository';
import Cliente from '../entities/Cliente';
import Atendimento from '../entities/Atendimento';

class ClienteService {
  private clienteRepository = ClienteRepository(AppDataSource);
  private filaRepository = FilaRepository(AppDataSource);
  private saidaRepository = SaidaRepository(AppDataSource);

  async criarCliente(name: string, lugares: number): Promise<Cliente> {
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

  async obterStatusCliente(senha: string): Promise<{ posicao: number }> {
    const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const fila = cliente.fila;
    const posicao = fila.clientes.findIndex((c: Cliente) => c.senha === senha) + 1;

    return { posicao };
  }

  async removerCliente(senha: string): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const fila = cliente.fila;
    fila.clientes = fila.clientes.filter((c: Cliente) => c.senha !== cliente.senha);
    await this.clienteRepository.remove(cliente);
    await this.filaRepository.save(fila);

    const saida = this.saidaRepository.create({
      cliente: cliente, // Associa o cliente à saída
    });
    await this.saidaRepository.save(saida);
  }

  async redirecionarParaAtendimento(senha: string, funcionarioId: string): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { senha }, relations: ['fila', 'fila.clientes'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const fila = cliente.fila;
    fila.clientes = fila.clientes.filter((c: Cliente) => c.senha !== cliente.senha);
    await this.clienteRepository.remove(cliente);
    await this.filaRepository.save(fila);

    const atendimentoRepository = AppDataSource.getRepository(Atendimento);
    const atendimento = atendimentoRepository.create({ cliente, fila, funcionario: { id: funcionarioId } });
    await atendimentoRepository.save(atendimento);
  }
}

export default new ClienteService();
