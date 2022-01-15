
import { Boat } from "../dto/boat";

import { Cottage } from "../dto/cottage";
import { AdditionalService } from "../dto/enums/AdditionalService";
import { Amenity } from "../dto/enums/Amenity";
import { FishingEquipment } from "../dto/enums/FishingEquipment";
import { NavigationEquipment } from "../dto/enums/NavigationEquipment";
import { Token } from "../dto/token";
import { User } from "../dto/user";

export namespace Global {
    export var token: Token = new Token()
    export var clickedBoat : Boat
    export var clickedInstructor : User
    export var cottage: Cottage = new Cottage()
    export var forbiddenDates: any

    export var fishingEquipment = [
      {value: FishingEquipment[0], icon: '', display: 'Stick'},
      {value: FishingEquipment[1], icon: '', display: 'Rope'},
    ]

    export var navigationEquipment = [
      {value: NavigationEquipment[0], icon: '', display: 'GPS'},
      {value: NavigationEquipment[1], icon: '', display: 'Radar'},
      {value: NavigationEquipment[2], icon: '', display: 'VHF Radio'},
      {value: NavigationEquipment[3], icon: '', display: 'Fishfinder'}
    ]

    export var boatRules = [
      {value: AdditionalService[4], icon: '', display: ''},

    ]

    export var services = [
      {value: AdditionalService[0], icon: 'smoking_rooms', display: 'No smoking'},
      {value: AdditionalService[1], icon: 'pets', display: 'Pet friendly'},
      {value: AdditionalService[2], icon: 'party_mode', display: 'No parties'},
      {value: AdditionalService[3], icon: 'calendar_today', display: 'Allowed long term stays'},
    ]

    export var amenitiesBoat = [
      { value: Amenity[3], icon: 'live_tv', display: 'TV'},
      { value: Amenity[5], icon: 'fireplace', display: 'Heating'},
      { value: Amenity[19], icon: 'sunny', display: 'Airconditioning'},
      { value: Amenity[22], icon: 'fireplace', display: 'Grill'},
      { value: Amenity[23], icon: '', display: 'Bunk bed'},
      { value: Amenity[24], icon: '', display: 'Bow thruster'},
      { value: Amenity[9], icon: 'kitchen', display: 'Refrigerator'}
    ]

    export var amenities = [
        { value: Amenity[0],  icon: 'bathroom',       display: 'Hair dryer'},
        { value: Amenity[1],  icon: 'bathroom',       display: 'Shampoo'},
        { value: Amenity[2],  icon: 'bathroom',       display: 'Essentials (towels, bed sheets, soap and toilet paper.)'},
        { value: Amenity[3],  icon: 'live_tv',        display: 'TV'},
        { value: Amenity[4],  icon: 'people_alt',     display: 'Suitable for events'},
        { value: Amenity[5],  icon: 'fireplace',      display: 'Heating'},
        { value: Amenity[6],  icon: 'wifi',           display: 'WiFi'},
        { value: Amenity[7],  icon: 'laptop',         display: 'Dedicated workspace'},
        { value: Amenity[8],  icon: 'kitchen',        display: 'Kitchen'},
        { value: Amenity[9],  icon: 'kitchen',        display: 'Refrigerator'},
        { value: Amenity[10], icon: 'kitchen',        display: 'Cooking basics (Pots and pans, oil, salt and pepper.)'},
        { value: Amenity[11], icon: 'soup_kitchen',   display: 'Dishes and silverware (Bowls, chopsticks, plates, cups, etc.)'},
        { value: Amenity[12], icon: 'door_front',     display: 'Private entrance (Separate street or building entrance.)'},
        { value: Amenity[13], icon: 'yard',           display: 'Backyard (An open space on the property usually covered in grass.)'},
        { value: Amenity[14], icon: 'local_parking',  display: 'Free parking on premices'},
        { value: Amenity[15], icon: 'local_parking',  display: 'Free street parking'},
        { value: Amenity[16], icon: 'bathtub',        display: 'Hot tub'},
        { value: Amenity[17], icon: 'camera_outdoor', display: 'Security cameras on property'},
        { value: Amenity[18], icon: 'water_drop',     display: 'Washer'},
        { value: Amenity[19], icon: 'sunny',          display: 'Airconditioning'},
        { value: Amenity[20], icon: 'alarm_on',       display: 'Smoke alarm (This place may not have a smoke detector. )'},
        { value: Amenity[21], icon: 'alarm_on',       display: 'Carbon monoxid alarm (This place may not have a carbon monoxide detector.)'}
      ]
}