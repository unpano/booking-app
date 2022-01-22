import { Adventure } from "./adventure"
import { Boat } from "./boat"
import { Client } from "./client"
import { Cottage } from "./cottage"



export class ClientRate
{
    id !: Number
    rate !: Number
    review !: String
    client !: Client
    boat !: Boat
    cottage !: Cottage
    adventure !: Adventure
}
