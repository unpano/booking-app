import { Cottage } from "../dto/cottage";
import { Token } from "../dto/token";

export namespace Global {
    export var token: Token = new Token();
    export var cottage: Cottage = new Cottage();
}