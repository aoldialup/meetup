import { IsDate, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { State } from './State';

// @Entity({ name: 'cities' })
// export class City {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   @Length(2)
//   abbvr: string;

//   @Column()
//   @Length(50)
//   name: string;
// }

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(10, 100)
  street: string;

  @Column()
  @Length(2, 50)
  city: string;

  @OneToOne(() => State, { cascade: true })
  @JoinColumn()
  state: State;

  // @Column()
  // @DateTime()
  // scheduledDate

  @CreateDateColumn()
  @IsDate()
  createdDate: Date;
}
