import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableEmploye1694710993415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"employee",
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
                    {
                        name:"discord",
                        type:"varchar",
                    },
                    {
                        name:"linkedin",
                        type:"varchar",
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employee")
    }

}

