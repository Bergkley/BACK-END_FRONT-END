import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableCategory1694707991911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"categories",
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
                        name:"description",
                        type:"varchar",
                        isNullable:false
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories")
    }

}
