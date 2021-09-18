import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Cupom1631948102407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cupom",
                columns: [
                    {
                        name: "id_cupom",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "discount",
                        type: "int"
                    },
                    {
                        name: "name_cupom",
                        type: "varchar"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cupom");
    }

}
