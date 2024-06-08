import bcrypt from 'bcrypt';

export default async (comparableString, hashValue) => {
    const isMatched = await bcrypt.compare(comparableString, hashValue);
    return isMatched;
};