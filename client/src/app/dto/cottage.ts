
import { Amenity } from "./enums/Amenity";
import { User } from "./user";


export class Cottage{
    id !: Number;
    name !: String;
    address !: String;
    city !: String;
    description !: String;
    maxNumOfPersons !: Number;
    rate !: Number;
    amenities !: Amenity[]
}
