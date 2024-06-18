import { errorLogger } from "../logger/logConfig.js";

const catchAsync = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
        errorLogger.error(error);
    }
};

export default catchAsync;