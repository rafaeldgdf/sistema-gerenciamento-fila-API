import { DataSource } from 'typeorm';
import Cliente from './entities/Cliente';
import Funcionario from './entities/Funcionario';
import Fila from './entities/Fila';
import Atendimento from './entities/Atendimento';
import Saida from './entities/Saida';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'sistemafila_novo',
  synchronize: true,
  //dropSchema: true,  // Adicione esta linha para descartar e recriar o esquema automaticamente
  logging: false,
  entities: [Cliente, Funcionario, Fila, Atendimento, Saida],
  migrations: [],
  subscribers: [],
});
