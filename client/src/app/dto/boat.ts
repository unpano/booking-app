import { BoatType } from "./enums/BoatType"
import { NavigationEquipment } from "./enums/NavigationEquipment"

export class Boat{
    id !: Number
    name !: String
    address !: String
    behavioralRules !: String
    cancellationConditions !: String
    capacity !: Number
    fishingEquipment !: String
    maxSpeed !: Number
    motorPower !: Number
    description !: String
    numberOfMotors !: Number
    rate !: String
    type !: BoatType
    length !: String
    navigationEquipment !: NavigationEquipment
  }


