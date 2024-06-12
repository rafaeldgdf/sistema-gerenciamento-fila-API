import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Cliente from '../entities/Cliente';
import Fila from '../entities/Fila';
import Atendimento from '../entities/Atendimento';
import Saida from '../entities/Saida';
import Funcionario from '../entities/Funcionario';

export const cadastrarCliente = async (name: string, lugares: number) => {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const filaRepository = AppDataSource.getRepository(Fila);

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

class ClienteController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, lugares } = req.body as { name: string, lugares: number };

      if (lugares < 1 || lugares > 10) {
        return res.status(400).json({ error: 'Capacidade da fila deve estar entre 1 e 10 lugares.' });
      }

      const { cliente, fila } = await cadastrarCliente(name, lugares);

      // Emitir evento de atualização da fila
      const io = req.app.get('io');
      io.emit('filaAtualizada', fila);

      return res.json({ message: 'Cliente adicionado com sucesso', senha: cliente.senha, fila });
    } catch (error: unknown) {
      console.error('Erro ao adicionar cliente:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async status(req: Request, res: Response): Promise<Response> {
    try {
      console.log('Requisição recebida para verificar status');
      const { senha } = req.query as { senha: string };
      console.log(`Buscando cliente com a senha: ${senha}`);
      const clienteRepository = AppDataSource.getRepository(Cliente);

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

      const posicao = fila.clientes.findIndex((c: Cliente) => c.senha === senha) + 1;

      console.log(`Posição encontrada: ${posicao}, Fila: ${fila.capacidade}`);
      return res.json({ posicao, fila: fila.capacidade });
    } catch (error: unknown) {
      console.error('Erro ao verificar status do cliente:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async sair(req: Request, res: Response): Promise<Response> {
    try {
      const { senha, funcionarioId } = req.body as { senha: string, funcionarioId: string };
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const saidaRepository = AppDataSource.getRepository(Saida);
      const filaRepository = AppDataSource.getRepository(Fila);
      const funcionarioRepository = AppDataSource.getRepository(Funcionario);

      const cliente = await clienteRepository.findOne({ where: { senha }, relations: ['fila'] });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const fila = cliente.fila;
      fila.clientes = fila.clientes.filter((c: Cliente) => c.id !== cliente.id);
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
    } catch (error: unknown) {
      console.error('Erro ao remover cliente da fila:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async redirecionarParaAtendimento(req: Request, res: Response): Promise<Response> {
    try {
      const { senha, funcionarioId } = req.body;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const filaRepository = AppDataSource.getRepository(Fila);
      const atendimentoRepository = AppDataSource.getRepository(Atendimento);
      const funcionarioRepository = AppDataSource.getRepository(Funcionario);

      const cliente = await clienteRepository.findOne({ where: { senha }, relations: ['fila'] });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const fila = cliente.fila;
      fila.clientes = fila.clientes.filter((c: Cliente) => c.id !== cliente.id);
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
    } catch (error: unknown) {
      console.error('Erro ao redirecionar cliente para atendimento:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new ClienteController();
