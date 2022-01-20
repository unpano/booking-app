import { Boat } from "./boat";
import { Client } from "./client";
import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: ReservationType;
    startTime !: String;
    endTime !: String;
    client !: Client;
    reported : Boolean = false
    price !: Number
    numOfPersons !: String
    boat !: Boat 
}