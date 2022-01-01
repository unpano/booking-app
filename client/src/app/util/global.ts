import { Boat } from "../dto/boat";
import { Token } from "../dto/token";

export namespace Global {
    export var token: Token = new Token();
    export var clickedBoat : Boat;

}