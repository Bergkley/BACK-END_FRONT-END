import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableSubsector1694714156554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"subsector",
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
                        name:"description",
                        type:"varchar"
                    },
                    {
                        name:"url",
                        type:"varchar"
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
