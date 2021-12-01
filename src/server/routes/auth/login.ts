import * as jwt from 'jsonwebtoken';
import config, { jwt_config } from '../../config';
import *  as passport from 'passport';
import db_authors from '../../database/queries/authors';
import { Router } from 'express';
import { ReqUser } from '../../types';

const router = Router();

router.post('/', passport.authenticate('local'), async ( req: ReqUser, res) =>{

    try {
        
        const token = jwt.sign(
            { userid: req.user.id, email: req.user.email}, //this is correct!
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
        );
        res.status(200).json({message: "successful login!", token });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Fuckin login broke!', error }) 
    }

})





export default router;