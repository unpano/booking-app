import { User } from "./user";

export class ActionReport{
    id !: Number;
    comment !: String;
    punishClient !: Boolean;
    approved !: Boolean;
    clientId !: Number;
    actionReservationId !: Number;
    clientInfo !: User;
    isRejectedForApproving !: Boolean;
    instructorInfo !: User;
}