import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FuncionarioRepository } from '../repositories/FuncionarioRepository';
import { FilaRepository } from '../repositories/FilaRepository';
import { AtendimentoRepository } from '../repositories/AtendimentoRepository';
import { SaidaRepository } from '../repositories/SaidaRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';

class FuncionarioController {
  async visualizarFilas(req: Request, res: Response): Promise<Response> {
    const filaRepository = FilaRepository(AppDataSource);
    const filas = await filaRepository.find({ relations: ['clientes'] });

    return res.json(filas);
  }

  async chamarCliente(req: Request, res: Response): Promise<Response> {
    const { filaId } = req.body;
    const filaRepository = FilaRepository(AppDataSource);
    const atendimentoRepository = AtendimentoRepository(AppDataSource);

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
    const { clienteId } = req.body;
    const clienteRepository = ClienteRepository(AppDataSource);
    const saidaRepository = SaidaRepository(AppDataSource);

    const cliente = await clienteRepository.findOne({ where: { id: clienteId }, relations: ['fila'] });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const fila = cliente.fila;
    fila.clientes = fila.clientes.filter(c => c.id !== cliente.id);
    await clienteRepository.remove(cliente);
    await FilaRepository(AppDataSource).save(fila);

    const saida = saidaRepository.create({ ...cliente });
    await saidaRepository.save(saida);

    return res.status(204).send();
  }
}

export default new FuncionarioController();
