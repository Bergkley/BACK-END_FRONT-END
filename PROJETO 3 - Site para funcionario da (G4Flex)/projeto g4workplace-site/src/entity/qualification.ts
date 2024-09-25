import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity("qualification")
export class Qualification {
    @PrimaryGeneratedColumn()
    id:number;
    @Column('varchar')
    qualification:string;
    @Column('varchar')
    name:string

}