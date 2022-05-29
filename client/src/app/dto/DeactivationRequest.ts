import { User } from "./user";

export class DeactivationRequest{
    id !: Number;
    description !: String;
    status !: String;
    userId !: Number;
    firstNameUser !: String;
    lastNameUser !: String;
    emailUser !: String;
    roleUser !: String;
    canBeDeletedUser !: Boolean;
}