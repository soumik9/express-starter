import fs from 'fs';
import { logger } from '../helpers/logger/index.js';

const removeFile = async (imgPath) => {
    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
        logger.log("info", `File ${imgPath} deleted successfully`);
    } else {
        logger.log("error", `File ${imgPath} does not exist`);
    }
}

export default removeFile;