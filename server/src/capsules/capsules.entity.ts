import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Capsules extends BaseEntity {
  @PrimaryGeneratedColumn()
  capsuleId: number;

  @Column()
  description: string;

  @ManyToOne((type) => Users, (user) => user.capsules, { eager: false })
  user: Users;
}
