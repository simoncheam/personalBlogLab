import * as jwt from 'jsonwebtoken';
import config, { jwt_config } from '../../config';
import *  as passport from 'passport';
import { Router } from 'express';
import { ReqUser } from '../../types';

const router = Router();

router.post('/', passport.authenticate('local'), async ( req: ReqUser, res) =>{

    try {
        
        const token = jwt.sign(
            { userid: req.user.id, email: req.user.email},
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
        );
        res.json(token);
        console.log('successful login!');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Fuckin login broke!' }) 
    }

})

export default router;