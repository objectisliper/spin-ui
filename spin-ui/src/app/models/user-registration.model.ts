import {Deserializable} from "~/app/models/DeserializerInterface";

export class UserRegistrationModel implements Deserializable {
    name: string;
    email: string;
    password: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
