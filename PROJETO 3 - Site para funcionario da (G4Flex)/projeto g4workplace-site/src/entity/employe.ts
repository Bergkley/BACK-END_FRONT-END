import 'reflect-metadata';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Qualification } from './qualification';
import { Subsector } from './subsector';
import { Sector } from './sector';



@Entity("employee")
export class Employe {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    name:string;
    @Column("varchar")
    photo:string;
    @Column('varchar')
    email:string;
    @Column('varchar')
    description:string;
    @Column ('varchar')
    discord:string;
    @Column ('varchar')
    linkedin:string;
    @ManyToMany(type => Qualification)
    @JoinTable()
    qualification: Qualification[]
    @ManyToMany(type => Subsector)
    @JoinTable()
    subsectors:Subsector[]

    @ManyToMany(type => Sector, (sector) => sector.employees)
    sectors:Sector[]
}