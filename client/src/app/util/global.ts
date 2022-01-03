
import { Boat } from "../dto/boat";

import { Cottage } from "../dto/cottage";
import { Token } from "../dto/token";
import { User } from "../dto/user";

export namespace Global {
    export var token: Token = new Token();
    export var clickedBoat : Boat;
    export var clickedInstructor : User;
    export var cottage: Cottage = new Cottage();
}