import { BonusStatDict } from "./bonus-stat-dict.model";
import { Driver } from "./driver.model";
import { Group } from "./group.model";
import { Race } from "./race.model";
import { User } from "./user.model";

export class BonusStat {
  constructor(
    public id?: number,
    public points?: number,
    public bonusStatDictId?: number,
    public raceId?: number,
    public groupId?: number,
    public userId?: number,
    public driverId?: number,
    public bonusStatDict?: BonusStatDict,
    public user?: User,
    public group?: Group,
    public race?: Race,
    public driver?: Driver
  ) {}
}
