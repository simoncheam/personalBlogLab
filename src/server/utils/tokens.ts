import * as jwt from 'jsonwebtoken';
import {jwt_config} from '../config';

export const create_token = (payload: {[key:string]: string | number}) => {
    const token = jwt.sign(payload, jwt_config.signature,
        {expiresIn: jwt_config.expiration})
        return token;
}
