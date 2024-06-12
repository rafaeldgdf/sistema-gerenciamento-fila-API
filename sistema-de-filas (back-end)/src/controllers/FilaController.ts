import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Fila from '../entities/Fila';

class FilaController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const filaRepository = AppDataSource.getRepository(Fila);
      const filas = await filaRepository.find({
        relations: ['clientes'],
      });

      // Ordenar clientes manualmente
      filas.forEach(fila => {
        fila.clientes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      });

      return res.json(filas);
    } catch (error: unknown) {
      console.error('Erro ao listar filas:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Erro interno do servidor' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new FilaController();
