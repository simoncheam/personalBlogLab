import * as passport from 'passport';
import * as PassportJWT from 'passport-jwt';
import * as LocalStrategy from "passport-local";
import * as bcrypt from "bcrypt";
import { Application } from 'express';
import { Payload, Authors } from "../types";
import config from "../config";
import db_authors from "../database/queries/authors";
import db_blogtags from "../database/queries/blogtags";

export function configurePassport(app: Application){

    
    passport.serializeUser((user: Authors, done) =>{
        
        if (user?.password) delete user.password;
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user)
    });
    
    passport.use(
        new LocalStrategy.Strategy({
            usernameField: "email"
        },
        async(email, password, done) => {
            
            try {
                
                if(!email || !password) return done("Missing one or more fields", false);
                
                const [user] = await db_authors.getUserBy('email', email);
                
                if(!user) return done({ message: " invalid credentials"}, false);
                
                const isMatch = await bcrypt.compare(password, user?.password);
                
                if(!isMatch){
                    done({ message: "Ivalid credentials"}, false);
                } else{
                    delete user.password;
                    done(null, user);
                }
                
            } catch (error) {
                console.log(error);
                done(error, false);
                
            }
        }
        )
);

passport.use(new PassportJWT.Strategy({
    
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_config.secret
    
}, (payload: Payload, done) => {
    
    try {
        done(null, payload);
    } catch (error) {
        done(error)
        
    }
}))



app.use(passport.initialize())

}