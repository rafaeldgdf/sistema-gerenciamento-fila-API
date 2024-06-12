import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Cliente from './Cliente';
import Fila from './Fila';
import Funcionario from './Funcionario';

@Entity('atendimentos')
class Atendimento {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cliente, cliente => cliente.atendimentos)
  cliente!: Cliente;

  @ManyToOne(() => Fila, fila => fila.atendimentos)
  fila!: Fila;

  @ManyToOne(() => Funcionario, funcionario => funcionario.atendimentos)
  funcionario!: Funcionario;
}

export default Atendimento;
