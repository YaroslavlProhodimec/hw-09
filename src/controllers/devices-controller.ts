import {inject, injectable} from "inversify";
import {StatusCodes} from "http-status-codes";
import {Request,Response} from 'express'
@injectable()
export class DevicesController {
    constructor(@inject(JwtService) protected jwtService: JwtService,
                @inject(DeviceQueryRepository) protected deviceQueryRepository: DeviceQueryRepository,
                @inject(DeviceService) protected deviceService: DeviceService,
    ) {
    }

    async getAllDevicesCurrentUser (req:Request,res:Response) {
        const tokenDecode = await  this.jwtService.decodeToken(req.cookies.refreshToken)
        if(!tokenDecode) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED)
        }
        const devicesCurrentUser = await  this.deviceQueryRepository.getAllDevicesCurrentUser(tokenDecode.userId)
        return res.status(StatusCodes.OK).send(devicesCurrentUser)
    }
}