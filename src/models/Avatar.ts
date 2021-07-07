import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('avatar')
export default class Avatar {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => User, user => user.avatar)
  @JoinColumn({ name: 'user_id' })
  user: User;
}