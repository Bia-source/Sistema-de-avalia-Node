import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cart")
class Cart {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    value_total: number;

    @Column()
    itens?: string;

    @Column()
    id_cupom: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Cart }