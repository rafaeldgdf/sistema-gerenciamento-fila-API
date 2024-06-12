import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Atendimento from './Atendimento';

@Entity('funcionarios')
class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Atendimento, atendimento => atendimento.funcionario)
  atendimentos!: Atendimento[];
}

export default Funcionario;
