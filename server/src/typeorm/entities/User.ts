/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  @MinLength(1)
  username: string;

  @Column({})
  @IsNotEmpty()
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true }) 
  authStrategy: string;
}
 