import {container} from "../composition-root";
import {Router} from "express";
import {DevicesController} from "../controllers/devices-controller";

const devicesController = container.resolve(DevicesController)

export const routerSecurityDevices = Router({})


routerSecurityDevices.get('/devices',
    devicesController.getAllDevicesCurrentUser.bind(devicesController)
    )