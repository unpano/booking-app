import { User } from "./user";

export class ComplaintClient{
    id !: Number;
    complaint_comment !: String;
    response_admin !: String;
    client_id !: Number;
    instructor_id !: Number;
    userOtherInfo !: User;
    instructorOtherInfo !: User;
    
}