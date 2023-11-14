import 'reflect-metadata';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employe } from './employe';
import { Subsector } from './subsector';


@Entity("sector")
export class Sector {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    name:string;
    @Column("varchar")
    photo:string;
    @Column('varchar')
    url:string

    @ManyToMany(type => Employe, (employee) => employee.sectors)
    @JoinTable()
    employees: Employe[]
    
    @ManyToMany(type => Subsector)
    @JoinTable()
    subsectors:Subsector[]
}