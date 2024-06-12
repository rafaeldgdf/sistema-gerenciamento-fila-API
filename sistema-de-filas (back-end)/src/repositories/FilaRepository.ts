import { DataSource } from 'typeorm';
import Fila from '../entities/Fila';

export const FilaRepository = (dataSource: DataSource) => dataSource.getRepository(Fila);
