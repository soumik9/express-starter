import jwt from 'jsonwebtoken'
import { config } from '../../server/index.js';

export default (data) => {

  const payload = { _id: data._id };

  // token generating
  const token = jwt.sign(
    payload,
    config.TOKEN_SECRET,
    { expiresIn: config.TOKEN_SECRET_EXP }
  );

  return token;
};