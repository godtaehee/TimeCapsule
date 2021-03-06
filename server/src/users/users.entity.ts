import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Capsules } from '../capsules/capsules.entity';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Capsules, (capsule) => capsule.user, { eager: true })
  capsules: Capsules[];
}
