import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Cliente from './Cliente';
import Funcionario from './Funcionario';

@Entity('saidas')
class Saida {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cliente, { eager: true })
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, { eager: true })
  funcionario!: Funcionario;
}

export default Saida;
