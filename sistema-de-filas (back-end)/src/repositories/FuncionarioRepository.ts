import { DataSource } from 'typeorm';
import Funcionario from '../entities/Funcionario';

export const FuncionarioRepository = (dataSource: DataSource) => dataSource.getRepository(Funcionario);
