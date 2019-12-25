import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm/browser";
import {Deserializable} from "~/app/models/DeserializerInterface";

@Entity()
export class User extends BaseEntity implements Deserializable {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
