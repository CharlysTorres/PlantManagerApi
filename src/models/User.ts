import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';

import Avatar from './Avatar';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Avatar, avatar => avatar.user, {
    cascade: ['insert', 'update']
  })
  avatar: Avatar[];
}