
export class User{
  id !: Number
  firstName !: String
  lastName !: String
  email !: string
  password !: String
  address !: String
  city !: String
  country !: String
  phoneNumber !: String
  reason !: String
  userType !: String
  picture !: String
  numOfPenalties !: Number;
  hasReport !: Boolean;
  rejectedVerification !: Boolean;
  hasDeactivationRequest !: Boolean;
  canBeDeleted !: Boolean;
}