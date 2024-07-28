import moment from "moment";
import { httpLogger } from "./logConfig.js";
import getRequestUrl from "../global/getRequestUrl.js";

const requestLogger = (req, res, next) => {
    const { method } = req;
    const startTime = moment();

    res.on('finish', () => {
        const endTime = moment();
        const duration = endTime.diff(startTime);
        const formattedDuration = moment.duration(duration).asMilliseconds();
        const message = `${method} ${getRequestUrl.getRequestFulllUrl(req)} ${res.statusCode} - ${formattedDuration}ms`;
        httpLogger.http(message);
    });

    next();
};

export default requestLogger;