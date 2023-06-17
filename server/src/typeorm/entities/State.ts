import { Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'states' })
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2)
  short: string;

  @Column({ unique: true })
  @Length(50)
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
