import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Cliente from '../entities/Cliente';
import Fila from '../entities/Fila';
import Atendimento from '../entities/Atendimento';
import Saida from '../entities/Saida';
import Funcionario from '../entities/Funcionario'; 

class FuncionarioController {
  async visualizarFilas(req: Request, res: Response): Promise<Response> {
    const filaRepository = AppDataSource.getRepository(Fila);
    const filas = await filaRepository.find({ relations: ['clientes'] });
    return res.json(filas);
  }

  async chamarCliente(req: Request, res: Response): Promise<Response> {
    const { filaId } = req.body;
    const filaRepository = AppDataSource.getRepository(Fila);
    const atendimentoRepository = AppDataSource.getRepository(Atendimento);

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

  async removerCliente(req: Request, res: Response): Promise<Response> {
    const { clienteId, funcionarioId } = req.body;
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const saidaRepository = AppDataSource.getRepository(Saida);
    const filaRepository = AppDataSource.getRepository(Fila);
    const funcionarioRepository = AppDataSource.getRepository(Funcionario);

    const cliente = await clienteRepository.findOne({ where: { id: clienteId }, relations: ['fila'] });
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

    return res.status(204).send();
  }
}

export default new FuncionarioController();
