import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Capsules extends BaseEntity {
  @PrimaryGeneratedColumn()
  capsuleId: number;

  @Column()
  description: string;

  @Column()
  userId: number;
}
