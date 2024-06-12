import { DataSource } from 'typeorm';
import Atendimento from '../entities/Atendimento';

export const AtendimentoRepository = (dataSource: DataSource) => dataSource.getRepository(Atendimento);
