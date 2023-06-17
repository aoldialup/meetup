import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';

enum ClubCategory {
  'RoadRunner',
  'Womens',
  'City',
  'Trail',
  'Endurance',
}

@Entity({ name: 'clubs' })
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @Column({ default: '' })
  description: string;

  @Column({
    type: 'enum',
    enum: Object.values(ClubCategory).filter((v) => isNaN(Number(v))),
  })
  clubCategory: ClubCategory;

  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  @Column({ default: '' })
  image: string;

  // @Column({ nullable: true })
  // dob: Date;
}
