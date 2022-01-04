
import { Boat } from "../dto/boat";

import { Cottage } from "../dto/cottage";
import { Amenity } from "../dto/enums/Amenity";
import { Token } from "../dto/token";
import { User } from "../dto/user";

export namespace Global {
    export var token: Token = new Token();
    export var clickedBoat : Boat;
    export var clickedCottage : Cottage;
    export var clickedInstructor : User;
    export var cottage: Cottage = new Cottage();

    export var amenities = [
        { value: Amenity[0], display: 'Hair dryer' },
        { value: Amenity[1], display: 'Shampoo' },
        { value: Amenity[2], display: 'Essentials (towels, bed sheets, soap and toilet paper.)' },
        { value: Amenity[3], display: 'TV' },
        { value: Amenity[4], display: 'Suitable for events (The listing can accommodate a gathering of 25 or more attendees.)' },
        { value: Amenity[5], display: 'Heating' },
        { value: Amenity[6], display: 'WiFi' },
        { value: Amenity[7], display: 'Dedicated workspace (A desk or table with a chair and space for a laptop.)' },
        { value: Amenity[8], display: 'Kitchen' },
        { value: Amenity[9], display: 'Refrigerator (Space where guests can cook their own meals.)' },
        { value: Amenity[10], display: 'Cooking basics (Pots and pans, oil, salt and pepper.)' },
        { value: Amenity[11], display: 'Dishes and silverware (Bowls, chopsticks, plates, cups, etc.)' },
        { value: Amenity[12], display: 'Private entrance (Separate street or building entrance.)' },
        { value: Amenity[13], display: 'Backyard (An open space on the property usually covered in grass.)' },
        { value: Amenity[14], display: 'Free parking on premices' },
        { value: Amenity[15], display: 'Free street parking' },
        { value: Amenity[16], display: 'Hot tub' },
        { value: Amenity[17], display: 'Security cameras on property' },
        { value: Amenity[18], display: 'Washer' },
        { value: Amenity[19], display: 'Airconditioning' },
        { value: Amenity[20], display: 'Smoke alarm (This place may not have a smoke detector. )' },
        { value: Amenity[21], display: 'Carbon monoxid alarm (This place may not have a carbon monoxide detector.)' }
      ];
}