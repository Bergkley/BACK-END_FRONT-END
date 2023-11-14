import 'reflect-metadata';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity("customer")
export class Customer {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    name:string;
    @Column("varchar")
    photo:string;
    @Column('varchar')
    email:string;
    @Column('varchar')
    site:string;
}