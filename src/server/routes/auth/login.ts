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
            { userid: req.user.id, email: req.user.email},
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
        );
        res.status(200).json({message: "successful login!", token });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Fuckin login broke!', error }) 
    }

})


//create login route: Do I need this?

router.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    const [user] = await db_authors.getUserBy('email', email);

    if(!user){
        res.status(400).json({message: "invalid credentials"});
    }
    res.status(200).json({message: "successful login!" });
    



})


export default router;