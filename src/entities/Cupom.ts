import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cupom")
class Cupom {

    @PrimaryColumn()
    id_cupom: string;

    @Column()
    discount: number;

    @Column()
    name_cupom: string;

    constructor() {
        if(!this.id_cupom) {
            this.id_cupom = uuid();
        }
    }
}

export { Cupom }