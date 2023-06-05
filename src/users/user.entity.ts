
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';
//import { Photo } from '../photos/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 1 })
  lvl: number;

  @DeleteDateColumn()
  DeleteDateColumn: Date;

 // @OneToMany(type => Photo, photo => photo.user)
 // photos: Photo[];
}
