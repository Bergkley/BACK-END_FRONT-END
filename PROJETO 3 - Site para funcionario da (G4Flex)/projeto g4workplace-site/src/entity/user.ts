import 'reflect-metadata';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    name:string;
    @Column("varchar")
    photo:string;
    @Column('varchar')
    email:string;
    @Column('varchar')
    password:string
    @Column('varchar')
    security_question:string
}