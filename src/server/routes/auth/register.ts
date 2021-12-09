import * as jwt from 'jsonwebtoken';
import config, { jwt_config } from '../../config';
import db_authors from '../../database/queries/authors';
import {Router} from 'express';
import { generateHash} from '../../utils/passwords';

const router = Router();

router.post('/', async (req, res) =>{

    const newUser = req.body;

    try {
        
        //create new hash
        newUser.password = generateHash(newUser.password);

        //insert new user into db
        const result = await db_authors.create(newUser);
        result.insertId;
        
        console.log(result);

        //create new Token
        const token = jwt.sign(
            {userid: result.insertId, email: newUser.email },
            config.jwt_config.secret,
            {expiresIn: jwt_config.expiration}
        );

        res.status(200).json({message: "successful registration", token });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "A server errors occurred", error});
        
    }
})

export default router;
