import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Cliente from './Cliente';
import Atendimento from './Atendimento';

@Entity('filas')
class Fila {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome!: string;

  @Column()
  capacidade!: number;

  @Column()
  priority!: number;

  @OneToMany(() => Cliente, cliente => cliente.fila, { cascade: true })
  clientes!: Cliente[];

  @OneToMany(() => Atendimento, atendimento => atendimento.fila, { cascade: true })
  atendimentos!: Atendimento[];
}

export default Fila;
