import { Time } from "@angular/common";
import { NgxTimepickerFieldComponent } from "ngx-material-timepicker";
import { AdditionalService } from "./enums/AdditionalService";
import { Amenity } from "./enums/Amenity";
import { Room } from "./Room";

export class Cottage{
    id !: Number
    name !: String
    address !: String
    city !: String
    description !: String
    maxNumOfPersons !: Number
    rate !: Number
    amenities !: Amenity[]
    additionalServices !: AdditionalService[]
    rooms !: Room[]
    oneDayPrice !: Number
    checkout !: Time
}
