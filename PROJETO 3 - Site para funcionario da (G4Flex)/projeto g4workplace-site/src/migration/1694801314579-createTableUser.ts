import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUser1694801314579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table(
            {
                name:"user",
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
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"email",
                        type:"varchar",
                        isNullable:false,
                        isUnique:true,
                    },
                    {
                        name:"password",
                        type:"varchar",
                        isNullable:false
                    },
                    {
                        name:'security_question',
                        type:'varchar',
                        isNullable:false
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
