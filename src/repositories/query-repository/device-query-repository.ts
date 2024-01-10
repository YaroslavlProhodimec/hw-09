import {injectable} from "inversify";
import {DevicesModel} from "../../db";

@injectable()
export class DeviceQueryRepository {
    async getAllDevicesCurrentUser (userId:string){
        const deviceArray = await DevicesModel.find({userId:userId}).lean()
        return deviceArray.map(d)
    }
}