import { logger } from "../logger/index.js";

const catchAsync = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
        logger.log(error);
    }
};

export default catchAsync;