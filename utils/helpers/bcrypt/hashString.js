import bcrypt from 'bcrypt';
import config from '../../server/config.js';

export default async (string) => {
    const hashedString = await bcrypt.hashSync(string, Number(config.BYCRYPT_SALT_ROUND));
    return hashedString;
};