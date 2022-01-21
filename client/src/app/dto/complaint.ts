import { Adventure } from "./adventure";
import { Boat } from "./boat";
import { Client } from "./client";
import { Cottage } from "./cottage";


export class Complaint 
{
    id !: Number
    name !: String
    content !: String
    client !: Client
    boat !: Boat
    cottage !: Cottage
    adventure !: Adventure
}
