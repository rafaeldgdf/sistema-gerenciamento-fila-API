import { DataSource } from 'typeorm';
import Saida from '../entities/Saida';

export const SaidaRepository = (dataSource: DataSource) => dataSource.getRepository(Saida);
