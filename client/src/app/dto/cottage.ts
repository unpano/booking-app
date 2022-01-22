import { AdditionalService } from "./enums/AdditionalService";
import { Amenity } from "./enums/Amenity";
import { Room } from "./Room";

export class Cottage{
    id !: Number;
    name !: String;
    address !: String;
    price !: Number;
    city !: String;
    description !: String;
    maxNumOfPersons !: Number;
    rate !: Number;
    amenities !: Amenity[];
    additionalServices !: AdditionalService[];
    rooms !: Room[];
    oneDayPrice !: Number;
}
