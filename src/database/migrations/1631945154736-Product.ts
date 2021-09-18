import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Product1631945154736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "product_name",
                        type: "varchar"
                    },
                    {
                        name: "product_category",
                        type: "varchar"
                    },
                    {
                        name: "quantity_stock",
                        type: "int"
                    },
                    {
                        name: "value",
                        type: "int"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
    }

}
