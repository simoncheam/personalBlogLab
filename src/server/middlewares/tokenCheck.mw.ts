import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { useParams,  Link, useNavigate } from "react-router-dom";


//let navigate = useNavigate();
export function tokenCheck(req: Request, res: Response, next: NextFunction) {

    passport.authenticate('jwt', (err, user, info) => {

        if (err) {
            return next(err)
        }

        if (info) {
            return res.status(401).json({
                message: "Error while authenticating, please log in again before retrying.",
                error: info.message
            });
        }
        if (!user) { 
            // Q: can we review this section? issues with navigate function, should this be were 401 is provided? Why is this needed?

            // return res.status(401).json({message: 'redirect to login'});

        
           return res.redirect('/login')  // this works
            
          // return navigate(`/login`); //testing
            
           
        }
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};