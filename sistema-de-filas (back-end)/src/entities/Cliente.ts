import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import Fila from './Fila';
import Atendimento from './Atendimento';

@Entity('clientes')
class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lugares!: number;

  @Column({ nullable: false })
  senha!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Fila, fila => fila.clientes)
  fila!: Fila;

  @OneToMany(() => Atendimento, atendimento => atendimento.cliente)
  atendimentos!: Atendimento[];
}

export default Cliente;
