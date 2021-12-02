
import { Request, Response, NextFunction } from 'express';
import { BlogTagsJoined } from '../types'
import blogs_db from '../../server/database/queries/blogs';
import { ReqUser } from '../types';

//check if user matches authorid before CRUD op
export async function authorCheck  (req: ReqUser, res: Response, next: NextFunction) {

    // const TOKEN_KEY = 'token';
    // const token = localStorage.getItem(TOKEN_KEY);
    // console.log(`fucking token: ${token}`);
    
    //Need to compare:
    // req.user.id
    //blogs.authorid
    try {
        const blog_id = req.params.id;
        console.log(`Blog ID is : ${blog_id}`); //this works

        const [one_blog] =  (await blogs_db.get_one_by_id(Number(blog_id)))[0]; //grab item at index pos 0
    
        
        
        console.log(one_blog);
        const {a_id} = one_blog;
        let authorid = a_id;
        
        console.log(`author id is: ${authorid}`); //works!!! FROM BLOG DB
        

        
        //retrieve userid from req.user
        let userid = req.user.userid;
        console.log(`User ID is: ${userid}`); //works
        
        
        console.log(`Author ID is : ${authorid}`);

            // Checks if user is the author
        if (!req.user || userid !== authorid) {
            console.log('invalid OR userid does not match author id!');
            
            return  res.status(403).json({ message: "invalid OR userid does not match author id!"})
            
            //return res.redirect('/login')    // Change! send 403 instead!

        }
        console.log('AUTHORIZED! This should work!');
        return next();
        

    } catch (error) {
       return  res.status(400).json({ message: "not allowed!", error })

    }
    
    
};


