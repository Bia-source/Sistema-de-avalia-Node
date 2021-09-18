import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("product")
class Product {
  
    @PrimaryColumn()
    readonly id: string;

    @Column()
    product_name: string;

    @Column()
    product_category: string;
 
    @Column()
    quantity_stock: number;

    @Column()
    value: number;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Product }