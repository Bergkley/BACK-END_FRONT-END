import 'reflect-metadata';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Qualification } from './qualification';
import { Sector } from './sector';


@Entity("subsector")
export class Subsector {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    name:string;
    @Column("varchar")
    photo:string;
    @Column('varchar')
    description:string;
    @Column('varchar')
    url:string
    @ManyToOne(() => Sector, sector => sector.subsectors) 
    @JoinTable() 
    sector: Sector;
}