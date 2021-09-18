import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Cart1631952205993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "value_total",
                        type: "int"
                    },
                    {
                        name: "itens",
                        type: "varchar"
                    },
                    {
                        name: "id_cupom",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart");
    }

}
