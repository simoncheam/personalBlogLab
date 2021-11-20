import * as passport from 'passport';
import { Request, Response, NextFunction} from 'express';

export function tokenCheck (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', (err, user, info)=>{

        if(err){
            return next(err)
        }
        if(info){
            return res.status(500).json({
                message: "Error while authenticating, please log in again before retrying.",
                error: info.message
            });
        }
        if(!user){
           // return res.status(401).json({message: 'redirect to login'});
            return res.redirect('/login')
            console.log('redirect to login');
        }
        if(user){
            req.user = user;
        }
        next();
    }) (req, res, next);
};