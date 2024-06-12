import { DataSource } from 'typeorm';
import Cliente from '../entities/Cliente';

export const ClienteRepository = (dataSource: DataSource) => dataSource.getRepository(Cliente);
