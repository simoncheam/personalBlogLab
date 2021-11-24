import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { useParams, Link, useNavigate } from "react-router-dom";
import { ReqUser } from '../types';


//let navigate = useNavigate();
export function tokenCheck(req: ReqUser, res: Response, next: NextFunction) {

    passport.authenticate('jwt', (err, user, info) => {

        if (err) {
            return next(err)
        }

        if (info) { // if toke is not good
            return res.status(401).json({
                message: "Error while authenticating, please log in again before retrying.",
                error: info.message
            });
        }
        if (!user) { // edge case if token is good but user does not exist

            return res.redirect('/login')  // this works
        }

        if (user) {

            req.user = user;
            delete req.user.password;
            
        }
        next();
    })(req, res, next);
};