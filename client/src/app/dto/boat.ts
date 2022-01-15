import { AdditionalService } from "./enums/AdditionalService";
import { Amenity } from "./enums/Amenity";
import { BoatType } from "./enums/BoatType"
import { CancelationType } from "./enums/CancelationType";
import { FishingEquipment } from "./enums/FishingEquipment";
import { NavigationEquipment } from "./enums/NavigationEquipment"

export class Boat{
  id !: Number
  name !: String
  boatType !: BoatType
  address !: String
  description !: String
  rate !: Number
  amenities !: Amenity[]
  additionalServices !: AdditionalService[]
  length !: Number
  maxSpeed !: Number
  motorPower !: Number
  numberOfMotors !: Number
  capacity !: Number
  navigationEquipment !: NavigationEquipment[]
  fishingEquipment !: FishingEquipment[]
  cancelationType !: CancelationType
}


