import { User } from "./user";

export class Adventure{
    id !: Number;
    instructorId !: Number;
    name !: String;
    address !: String;
    description !: String;
    maxNumOfPersons !: Number;
    rules!: String[];
    equipment !: String[];
    roomNum !: Number;
    price !: Number;
    rate !: Number;
    additionalInfo !: String;
    cancelationPrice !: String;
    numberOfActions !: Number;
    numberOfPastActions !: Number;
    instructorInfo !: User;
    hasSubscription !: Boolean;
   

}