import { Client } from "./Client";
import { Instructor } from "./Instructor";

export class MarkRevisionClient{
    id !: Number;
    mark !: Number;
    revisionComment !: String;
    clientId !: Number;
    instructorId !: Number;
    approvedByAdmin !: Boolean;
    rejected !: Boolean;
    instructor !: Instructor;
    client !: Client;
}