import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableSector1694713617305 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"sector",
                columns:[
                    {
                        name:"id",
                        type:"integer",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"name",
                        type:"varchar",
                        isNullable:false,
                        isUnique:true
                    },
                    {
                        name:"photo",
                        type:"varchar"
                    },
                    {
                        name:"url",
                        type:'varchar',
                        isNullable:true
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sector")
    }

}
