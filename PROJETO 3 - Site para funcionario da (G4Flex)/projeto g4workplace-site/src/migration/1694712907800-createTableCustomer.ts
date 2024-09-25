import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableCustomer1694712907800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"customer",
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
                        name:"site",
                        type:"varchar",
                    },
                    {
                        name:"photo",
                        type:"varchar",
                    },
                    {
                        name:"email",
                        type:"varchar",
                        isNullable:false,
                        isUnique:true
                    },

                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
