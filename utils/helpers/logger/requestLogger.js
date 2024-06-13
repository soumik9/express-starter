import logger from "./logger.js";
import { getRequestUrl } from "../global/index.js";
import moment from "moment";

const requestLogger = (req, res, next) => {
    const { method, url } = req;
    const startTime = moment();

    res.on('finish', () => {
        const endTime = moment();
        const duration = endTime.diff(startTime);
        const formattedDuration = moment.duration(duration).asMilliseconds();
        const message = `${method} ${getRequestUrl.getRequestFulllUrl(req) + url} ${res.statusCode} - ${formattedDuration}ms`;
        logger.log("http", message);
    });

    next();
};

export default requestLogger;